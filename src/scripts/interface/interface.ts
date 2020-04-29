import { Filter, SelectedFilter, Column } from "./types";

// export interface IReport {
//   tableElement: HTMLElement;
//   columns: Column[];
//   itemsPerPage: number;
//   data: any;
//   view: ReportView;

//   init(): void;
// }

export interface ITable {
  tableElement: HTMLElement;
  //pagination: IPagination;
  //filter: IFilter;
  view: ITableView;
  model: ITableModel;
  init(): void;
}
export interface ITableView {
  getTemplate(): string;
}

export interface ITableModel {
  initialData: object[];
  data: object[];
  getData(): object;
}

export interface IPagination {
  getCurrentPage(): number;
  getItemsPerPage(): number;
  view: IPaginationView;
  model: IPaginationModel;
  init(): void;
}

export interface IPaginationView {
  paginationItemSelector: string;
  itemsPerPageSelectSelector: string;
  getTemplate(pages: (string | number)[], currentPage: number, pageCount: number): string;
  getItemsPerPageTemplate(options: number[], selected: number): string;
}
export interface IPaginationModel {
  itemsPerPage: number;
  dataLength: number;
  currentPage: number;
  pages: (string | number)[];
  pageCount: number;
  setPage(page: number): void;
  setItemsPerPage(itemsPerPage: number): void;
  setDataLength(value: number): void;
}

export interface IFilter {
  getFilter(): SelectedFilter[];
  init(): void;
}

export interface IFilterView {
  currenFilterSelector: string;
  filterFormSelector: string;
  filterResetSelector: string;
  filterInputSelector: string;
  filterRemoveSelector: string;
  getTemplate(data: Filter[]): string;
  getCurrentFilterTemplate(currentFilter: SelectedFilter[]): string;
}
export interface IFilterModel {
  data: object[];
  columns: Column[];
  filter: SelectedFilter[];
  filters: Filter[];
  setFilter(filter: SelectedFilter[]): void;
  removeFilter(name: string): void;
}
