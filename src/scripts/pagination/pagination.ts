import { IPagination, IPaginationView, IPaginationModel } from "../interface/interface";
import { PaginationProps } from "../interface/types";

export default class Pagination implements IPagination {
  rootElement: HTMLElement;
  paginationSelector: string;
  itemsPerPageSelector: string;
  view: IPaginationView;
  model: IPaginationModel;

  constructor(props: PaginationProps) {
    this.rootElement = props.rootElement;
    this.paginationSelector = props.paginationSelector;
    this.itemsPerPageSelector = props.itemsPerPageSelector;
    this.view = props.paginationView;
    this.model = props.paginationModel;
    this.init();
  }

  get paginationElement() {
    return this.rootElement.querySelectorAll(`.${this.paginationSelector}`);
  }

  get itemsPerPageElement() {
    return this.rootElement.querySelector(`.${this.itemsPerPageSelector}`);
  }

  get itemsPerPageSelectElement() {
    return this.rootElement.querySelector(`.${this.view.itemsPerPageSelectSelector}`);
  }

  bindEvents() {
    this.rootElement.addEventListener("click", (evt) => {
      const target = evt.target as HTMLElement;
      if (target.classList.contains(this.view.paginationItemSelector)) {
        const selectedPage = target.dataset.page;
        this.setPage(+selectedPage);
      }
    });
    this.rootElement.addEventListener("dataUpdate", (el: CustomEvent) => {
      this.setDataLength(el.detail.dataLength);
      this.setPage(1);
    });
  }

  bindItemsPerPageEvents() {
    this.itemsPerPageSelectElement.addEventListener("change", (evt) => {
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
    this.rootElement.dispatchEvent(
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
    this.rootElement.dispatchEvent(
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
    this.paginationElement.forEach((el) => {
      el.innerHTML = pagination;
    });
  }

  renderItemsPerPage() {
    const template = this.view.getItemsPerPageTemplate(
      [10, 30, 50, 70, 100],
      this.getItemsPerPage()
    );
    this.itemsPerPageElement.innerHTML = template;
  }

  init() {
    this.renderPagination();
    this.renderItemsPerPage();
    this.bindEvents();
    this.bindItemsPerPageEvents();
  }
}
