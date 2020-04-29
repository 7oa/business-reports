import { IPagination, IPaginationView, IPaginationModel } from "../interface/interface";
import { PaginationProps } from "../interface/types";

export default class Pagination implements IPagination {
  tableElement: HTMLElement;
  paginationSelector: string;
  itemsPerPageSelector: string;
  view: IPaginationView;
  model: IPaginationModel;

  constructor(props: PaginationProps) {
    this.tableElement = props.tableElement;
    this.paginationSelector = props.paginationSelector;
    this.itemsPerPageSelector = props.itemsPerPageSelector;
    this.view = props.paginationView;
    this.model = props.paginationModel;
    this.init();
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

  bindEvents() {
    this.tableElement.addEventListener("click", (evt) => {
      const target = evt.target as HTMLElement;
      if (target.classList.contains(this.view.paginationItemSelector)) {
        const selectedPage = target.dataset.page;
        this.setPage(+selectedPage);
      }
    });
    this.tableElement.addEventListener("dataUpdate", (el: CustomEvent) => {
      this.setDataLength(el.detail.dataLength);
      this.setPage(1);
    });
  }

  bindItemsPerPageEvents() {
    this.elements.itemsPerPageSelect.addEventListener("change", (evt) => {
      evt.preventDefault();
      const target = evt.target as HTMLInputElement;
      let itemsPerPage = +target.value;
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

  setPage(page: number) {
    this.model.setPage(page);
    this.renderPagination();
    this.tableElement.dispatchEvent(
      new CustomEvent("pageChange", {
        detail: {
          page,
        },
      })
    );
  }

  setItemsPerPage(itemsPerPage: number) {
    this.model.setItemsPerPage(itemsPerPage);
    this.renderPagination();
    this.tableElement.dispatchEvent(
      new CustomEvent("itemsPerPageChange", {
        detail: {
          itemsPerPage,
          page: this.getCurrentPage(),
        },
      })
    );
  }

  setDataLength(value: number) {
    this.model.setDataLength(value);
  }

  renderPagination() {
    const pagination = this.view.getTemplate(
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
    this.bindEvents();
    this.bindItemsPerPageEvents();
  }
}
