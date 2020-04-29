import {
  IPagination,
  IFilter,
  IPaginationView,
  IPaginationModel,
  IFilterView,
  IFilterModel,
  ITableModel,
  ITableView,
} from "./interface";

export type Column = {
  field: string;
  title: string;
  template?: string;
  filter: boolean;
  sort: boolean;
};

export type ReportProps = {
  element: string;
  itemsPerPage: number;
  columns: Column[];
};

export type TableProps = {
  tableElement: HTMLElement;
  tableSelector: string;
  columns: Column[];
  tableView: ITableView;
  tableModel: ITableModel;
};

export type PaginationProps = {
  tableElement: HTMLElement;
  paginationSelector: string;
  itemsPerPageSelector: string;
  paginationView: IPaginationView;
  paginationModel: IPaginationModel;
};

export type FilterProps = {
  tableElement: HTMLElement;
  filterSelector: string;
  filterView: IFilterView;
  filterModel: IFilterModel;
};

export type Filter = {
  field: string;
  title: string;
  min: number;
  max: number;
};

export type SelectedFilter = {
  name: string;
  title: string;
  min: string;
  max: string;
};
