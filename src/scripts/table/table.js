import TableView from "./table-view.js";
import TableModel from "./table-model.js";
import Pagination from "../pagination/pagination.js";
import Filter from "../filter/filter.js";
import { imageLink } from "../utils/image-link.js";

export default class Table {
  constructor(props) {
    this.tableElement = document.querySelector(props.element);
    this.columns = props.columns;
    this.view = new TableView();
    this.model = new TableModel({
      data: props.data,
      itemsPerPage: props.itemsPerPage,
    });
    this.pagination = new Pagination({
      tableElement: this.tableElement,
      paginationSelector: this.view.paginationSelector,
      itemsPerPageSelector: this.view.itemsPerPageSelector,
      itemsPerPage: props.itemsPerPage,
      dataLength: props.data.length,
    });
    this.filter = new Filter({
      tableElement: this.tableElement,
      filterSelector: this.view.filterSelector,
      data: props.data,
      columns: props.columns.filter((el) => el.filter === true),
    });
    this.init();
  }
  get elements() {
    return {
      tableHead: this.tableElement.querySelector(`.${this.view.tableHeadSelector}`),
      tableBody: this.tableElement.querySelector(`.${this.view.tableBodySelector}`),
    };
  }

  bindEvents() {
    const tableHeadElement = this.elements.tableHead;

    tableHeadElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      const sortSelector = this.view.sorFieldSelector;
      if (evt.target.classList.contains(sortSelector)) {
        const sortField = evt.target.dataset.field;
        const sortOrder = evt.target.dataset.sort;

        this.tableElement.querySelectorAll(`.${sortSelector}`).forEach((el) => {
          el.dataset.sort = "";
        });

        const newSortOrder = this.model.getNewSortOrder(sortOrder);
        evt.target.dataset.sort = newSortOrder;

        this.setSort(sortField, newSortOrder);
      }
    });
    this.tableElement.addEventListener("filterChange", () => {
      this.setFilter();
    });
    this.tableElement.addEventListener("pageChange", () => {
      this.renderData();
    });
    this.tableElement.addEventListener("itemsPerPageChange", () => {
      this.renderData();
    });
  }

  setFilter() {
    const filter = this.filter.getFilter();
    this.model.setFilter(filter);
    const dataLength = this.model.data.length;
    this.tableElement.dispatchEvent(
      new CustomEvent("dataUpdate", {
        detail: { dataLength },
      })
    );
    this.renderData();
  }

  setSort(field, orderBy) {
    this.model.setSort(field, orderBy);
    this.renderData();
  }

  setPage(page) {
    this.model.currentPage = page;
  }

  setItemsPerPage(value) {
    this.model.itemsPerPage = value;
  }

  renderTableHeader() {
    const tableHeader = this.columns.map((column) => this.view.getHeaderTemplate(column)).join("");
    this.elements.tableHead.innerHTML = tableHeader;
  }

  renderTable() {
    const tableTemplate = this.view.getTableTemplate();
    this.tableElement.innerHTML = tableTemplate;
  }

  renderRow(row) {
    return this.columns
      .map((column) => {
        return this.view.getColumnTemplate(
          column.template
            ? this._generateColumnByTemplate(row, column.template)
            : +row[column.field].toFixed(2)
        );
      })
      .join("");
  }

  _generateColumnByTemplate(el, template) {
    const column = template.replace(/#[A-Za-z]+#/g, (str) => {
      const field = str.replace(/#/g, "");
      return `${field === "image" ? imageLink + el[field] : el[field]}`;
    });
    return column;
  }

  renderData() {
    if (this.pagination) {
      this.setPage(this.pagination.getCurrentPage());
      this.setItemsPerPage(this.pagination.getItemsPerPage());
    }

    const data = this.model.getData();
    const template = data
      .map((row) => {
        return this.view.getRowTemplate(this.renderRow(row));
      })
      .join("");
    this.elements.tableBody.innerHTML = template;
  }

  init() {
    this.renderTable();
    this.renderTableHeader();
    this.renderData();
    this.bindEvents();
    if (this.pagination) this.pagination.init();
    if (this.filter) this.filter.init();
  }
}
