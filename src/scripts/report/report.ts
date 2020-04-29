import Data from "../data/data";
import ReportView from "./report-view";
import Table from "../table/table";
import Pagination from "../pagination/pagination";
// import PaginationView from "../pagination/pagination-view.js";
// import PaginationModel from "../pagination/pagination-model.js";
import Filter from "../filter/filter";
import { Column, ReportProps } from "../interface/types";

interface IReport {
  tableElement: HTMLElement;
  columns: Column[];
  itemsPerPage: number;
  data: any;
  view: ReportView;

  init(): void;
}

export default class Report implements IReport {
  tableElement: HTMLElement;
  columns: Column[];
  itemsPerPage: number;
  data: any;
  view: ReportView;

  constructor(url: string, props: ReportProps) {
    this.tableElement = document.querySelector(props.element);
    this.columns = props.columns;
    this.itemsPerPage = props.itemsPerPage;
    this.data = new Data().getData(url);
    this.view = new ReportView();
    this.init();
  }

  renderTable() {
    //const paginationView = new PaginationView();
    //const paginationModel = new PaginationModel();
    const tableProps = {
      tableElement: this.tableElement,
      tableSelector: this.view.tableSelector,
      itemsPerPage: this.itemsPerPage,
      columns: this.columns,
    };

    const paginationProps = {
      tableElement: this.tableElement,
      paginationSelector: this.view.paginationSelector,
      itemsPerPageSelector: this.view.itemsPerPageSelector,
      itemsPerPage: this.itemsPerPage,
    };

    const filterProps = {
      tableElement: this.tableElement,
      filterSelector: this.view.filterSelector,
      columns: this.columns.filter((el) => el.filter === true),
    };

    return this.data.then((data: []) => {
      const pagination = new Pagination({
        ...paginationProps,
        dataLength: data.length,
      });

      const filter = new Filter({
        ...filterProps,
        data,
      });

      new Table({
        ...tableProps,
        data,
        pagination,
        filter,
        //filter: new Filter(props, filterView, filterModel),
      });
    });
  }

  renderTemplate() {
    this.tableElement.innerHTML = this.view.getTemplate();
  }

  init() {
    this.renderTemplate();
    this.renderTable();
  }
}
