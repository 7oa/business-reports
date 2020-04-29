import Data from "../data/data";
import ReportView from "./report-view";
import Table from "../table/table";
import TableView from "../table/table-view";
import TableModel from "../table/table-model";
import Pagination from "../pagination/pagination";
import PaginationView from "../pagination/pagination-view";
import PaginationModel from "../pagination/pagination-model";
import Filter from "../filter/filter";
import FilterView from "../filter/filter-view";
import FilterModel from "../filter/filter-model";
import { Column, ReportProps } from "../interface/types";
import { IReport, IData } from "../interface/interface";

export default class Report implements IReport {
  rootElement: HTMLElement;
  columns: Column[];
  itemsPerPage: number;
  data: IData;
  view: ReportView;
  url: string;

  constructor(url: string, props: ReportProps) {
    this.rootElement = document.querySelector(props.element);
    this.columns = props.columns;
    this.itemsPerPage = props.itemsPerPage;
    this.data = new Data();
    this.view = new ReportView();
    this.url = url;
    this.init();
  }

  renderTable() {
    return this.data.getData(this.url).then((data: []) => {
      new Pagination({
        rootElement: this.rootElement,
        paginationSelector: this.view.paginationSelector,
        itemsPerPageSelector: this.view.itemsPerPageSelector,
        paginationView: new PaginationView(),
        paginationModel: new PaginationModel({
          itemsPerPage: this.itemsPerPage,
          dataLength: data.length,
        }),
      });

      new Filter({
        rootElement: this.rootElement,
        filterSelector: this.view.filterSelector,
        filterView: new FilterView(),
        filterModel: new FilterModel({
          data,
          columns: this.columns.filter((el) => el.filter === true),
        }),
      });

      new Table({
        rootElement: this.rootElement,
        tableSelector: this.view.tableSelector,
        columns: this.columns,
        tableView: new TableView({
          columnsLength: this.columns.length,
        }),
        tableModel: new TableModel({
          data,
          itemsPerPage: this.itemsPerPage,
        }),
      });
    });
  }

  renderTemplate() {
    this.rootElement.innerHTML = this.view.getTemplate();
  }

  init() {
    this.renderTemplate();
    this.renderTable();
  }
}
