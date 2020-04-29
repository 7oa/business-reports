import { IPagination, IFilter } from "./interface";

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
  itemsPerPage: number;
  columns: Column[];
  data: object[];
  pagination: IPagination;
  filter: IFilter;
};

export type PaginationProps = {
  tableElement: HTMLElement;
  paginationSelector: string;
  itemsPerPageSelector: string;
  itemsPerPage: number;
  dataLength: number;
};

export type FilterProps = {
  tableElement: HTMLElement;
  filterSelector: string;
  columns: Column[];
  data: object[];
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
