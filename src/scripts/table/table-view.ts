import { Column } from "../interface/types";
import { ITableView } from "../interface/interface";

export default class TableView implements ITableView {
  tableHeadSelector: string = "js-table-head";
  tableBodySelector: string = "js-table-body";
  sortFieldSelector: string = "js-sort";
  columnsLength: number;

  constructor(props: { columnsLength: number }) {
    this.columnsLength = props.columnsLength;
  }

  getHeaderTemplate(column: Column) {
    const sortSelector = this.sortFieldSelector;
    return `
      <div class="table__col${column.sort ? ` ${sortSelector}` : ""}" 
        data-field="${column.field}"
        style="width:${100 / +this.columnsLength}%">
        ${column.title}
      </div>
    `;
  }

  getRowTemplate(item: string) {
    return `
      <div class="table__row">
          ${item}
      </div>
    `;
  }

  getColumnTemplate(item: string) {
    return `
      <div class="table__col" style="width: ${100 / +this.columnsLength}%">
        ${item}
      </div>
    `;
  }

  getTemplate() {
    return `
      <div class="table__head">
        <div class="table__row ${this.tableHeadSelector}"></div>
      </div>
      <div class="table__body ${this.tableBodySelector}"></div>
    `;
  }
}
