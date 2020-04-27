import PaginationView from "./pagination-view.js";
import PaginationModel from "./pagination-model.js";

export default class Pagination {
  constructor(props) {
    this.tableElement = props.tableElement;
    this.paginationSelector = props.paginationSelector;
    this.itemsPerPageSelector = props.itemsPerPageSelector;
    this.view = new PaginationView();
    this.model = new PaginationModel({
      itemsPerPage: props.itemsPerPage,
      dataLength: props.dataLength,
    });
  }

  get elements() {
    return {
      pagination: this.tableElement.querySelectorAll(`.${this.paginationSelector}`),
      itemsPerPage: this.tableElement.querySelector(`.${this.itemsPerPageSelector}`),
      itemsPerPageSelect: this.tableElement.querySelector(
        `.${this.view.itemsPerPageSelectSelector}`
      ),
    };
  }

  bindPaginationEvent() {
    this.tableElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains(this.view.paginationItemSelector)) {
        const selectedPage = evt.target.dataset.page;
        this.setPage(selectedPage);
      }
    });
    this.tableElement.addEventListener("dataUpdate", (el) => {
      this.setDataLength(el.detail.dataLength);
      this.setPage(1);
    });
  }

  bindItemsPerPageEvents() {
    this.elements.itemsPerPageSelect.addEventListener("change", (evt) => {
      evt.preventDefault();
      let itemsPerPage = evt.target.value;
      if (itemsPerPage !== this.getItemsPerPage()) {
        this.setItemsPerPage(itemsPerPage);
      }
    });
  }

  getItemsPerPage() {
    return this.model.itemsPerPage;
  }

  getCurrentPage() {
    return this.model.currentPage;
  }

  getPages() {
    return this.model.pages;
  }

  getPageCount() {
    return this.model.pageCount;
  }

  setPage(page) {
    this.model.setPage(page);
    this.renderPagination();
    this.tableElement.dispatchEvent(new CustomEvent("pageChange"));
  }

  setItemsPerPage(itemsPerPage) {
    this.model.setItemsPerPage(itemsPerPage);
    this.renderPagination();
    this.tableElement.dispatchEvent(new CustomEvent("itemsPerPageChange"));
  }

  setDataLength(value) {
    this.model.setDataLength(value);
  }

  renderPagination() {
    const pagination = this.view.getPaginationTemplate(
      this.getPages(),
      this.getCurrentPage(),
      this.getPageCount()
    );
    this.elements.pagination.forEach((el) => {
      el.innerHTML = pagination;
    });
  }

  renderItemsPerPage() {
    const template = this.view.getItemsPerPageTemplate(
      [10, 30, 50, 70, 100],
      this.getItemsPerPage()
    );
    this.elements.itemsPerPage.innerHTML = template;
  }

  init() {
    this.renderPagination();
    this.renderItemsPerPage();
    this.bindPaginationEvent();
    this.bindItemsPerPageEvents();
  }
}
