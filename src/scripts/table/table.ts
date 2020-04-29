import { imageLink } from "../utils/image-link";
import { Column, TableProps } from "../interface/types";
import { ITable, IPagination, IFilter, ITableModel, ITableView } from "../interface/interface";

export default class Table implements ITable {
  tableElement: HTMLElement;
  tableSelector: string;
  columns: Column[];
  view: ITableView;
  model: ITableModel;
  pagination: IPagination;
  filter: IFilter;

  constructor(props: TableProps) {
    this.tableElement = props.tableElement;
    this.tableSelector = props.tableSelector;
    this.columns = props.columns;
    this.view = props.tableView;
    this.model = props.tableModel;
    this.pagination = props.pagination;
    this.filter = props.filter;
    this.init();
  }
  get elements() {
    return {
      tableHead: this.tableElement.querySelector(`.${this.view.tableHeadSelector}`),
      tableBody: this.tableElement.querySelector(`.${this.view.tableBodySelector}`),
      table: this.tableElement.querySelector(`.${this.tableSelector}`),
    };
  }

  bindEvents() {
    const tableHeadElement = this.elements.tableHead;

    tableHeadElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      const sortSelector = this.view.sortFieldSelector;
      const target = evt.target as HTMLElement;
      if (target.classList.contains(sortSelector)) {
        const sortField = target.dataset.field;
        const sortOrder = target.dataset.sort;

        this.tableElement.querySelectorAll(`.${sortSelector}`).forEach((el: HTMLElement) => {
          el.dataset.sort = "";
        });

        const newSortOrder = this.model.getNewSortOrder(sortOrder);
        target.dataset.sort = newSortOrder;

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

  setSort(field: string, orderBy: string) {
    this.model.setSort(field, orderBy);
    this.renderData();
  }

  setPage(page: number) {
    this.model.currentPage = page;
  }

  setItemsPerPage(value: number) {
    this.model.itemsPerPage = value;
  }

  renderTableHeader() {
    const tableHeader = this.columns.map((column) => this.view.getHeaderTemplate(column)).join("");
    this.elements.tableHead.innerHTML = tableHeader;
  }

  renderTable() {
    const tableTemplate = this.view.getTemplate();
    this.elements.table.innerHTML = tableTemplate;
  }

  renderRow(row: object) {
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

  _generateColumnByTemplate(el: object, template: any) {
    const column = template.replace(/#[A-Za-z]+#/g, (str: string) => {
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
  }
}
