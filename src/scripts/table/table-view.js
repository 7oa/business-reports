export default class TableView {
  constructor(props) {
    this.columns = props.columns;
    this.tableHeadSelector = "js-table-head";
    this.tableBodySelector = "js-table-body";
    this.paginationSelector = "js-table-pagination";
    this.filterSelector = "js-table-filter";
    this.itemsPerPageSelector = "js-table-items-per-page";
    this.sorFieldSelector = "js-sort";
  }

  getHeaderTemplate(column) {
    const sortSelector = this.sorFieldSelector;
    return `
      <div class="table__col${column.sort ? ` ${sortSelector}` : ""}" 
        data-field="${column.field}"
        style="width:${100 / +this.columns}%">
        ${column.title}
      </div>
    `;
  }

  getRowTemplate(item) {
    return `
      <div class="table__row">
          ${item}
      </div>
    `;
  }

  getColumnTemplate(item) {
    return `
      <div class="table__col" style="width: ${100 / +this.columns}%">
        ${item}
      </div>
    `;
  }

  getTableTemplate() {
    return `
      <div class="table">
        <div class="table__filter ${this.filterSelector}"></div>
        <div class="table__pagination-wrapper">
          <div class="table__pagination ${this.paginationSelector}"></div>
          <div class="table__select-items ${this.itemsPerPageSelector}"></div>
        </div>
        <div class="table__head">
          <div class="table__row ${this.tableHeadSelector}"></div>
        </div>
        <div class="table__body ${this.tableBodySelector}"></div>
        <div class="table__pagination-wrapper">
          <div class="table__pagination ${this.paginationSelector}"></div>
        </div>
      </div>
    `;
  }
}
