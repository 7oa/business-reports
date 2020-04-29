import { IReportView } from "../interface/interface";

export default class ReportView implements IReportView {
  paginationSelector: string = "js-table-pagination";
  filterSelector: string = "js-table-filter";
  itemsPerPageSelector: string = "js-table-items-per-page";
  tableSelector: string = "js-table";

  getTemplate() {
    return `
      <div class="table">
        <div class="table__filter ${this.filterSelector}"></div>
        <div class="table__pagination-wrapper">
          <div class="table__pagination ${this.paginationSelector}"></div>
          <div class="table__select-items ${this.itemsPerPageSelector}"></div>
        </div>
        <div class="${this.tableSelector}"></div>
        <div class="table__pagination-wrapper">
          <div class="table__pagination ${this.paginationSelector}"></div>
        </div>
      </div>
    `;
  }
}
