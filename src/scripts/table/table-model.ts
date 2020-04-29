import { sortFunc } from "../utils/utils";
import { SelectedFilter } from "../interface/types";
import { ITableModel } from "../interface/interface";

export default class TableModel implements ITableModel {
  sortOrder: string = "";
  sortField: string = "";
  filter: SelectedFilter[] = [];
  currentPage: number = 1;
  initialData: object[];
  data: object[];
  itemsPerPage: number;

  constructor(props: { data: object[]; itemsPerPage: number }) {
    this.initialData = [...props.data];
    this.data = [...props.data];
    this.itemsPerPage = props.itemsPerPage;
  }

  setSort(field: string, orderBy: string) {
    this.sortOrder = orderBy;
    this.sortField = field;
    this.updateData();
  }

  setFilter(filter: SelectedFilter[]) {
    this.filter = filter;
    this.updateData();
  }

  updateData() {
    const sortedData = this.sortData([...this.initialData]);
    this.data = this.filterData(sortedData);
  }

  sortData(data: object[]) {
    const field = this.sortField;
    const orderBy = this.sortOrder;
    return orderBy ? data.sort(sortFunc(field, orderBy)) : data;
  }

  filterData(data: object[]) {
    return data.filter((el) => {
      return this.filter.every(
        (f) => parseInt(el[f.name]) >= parseInt(f.min) && parseInt(el[f.name]) <= parseInt(f.max)
      );
    });
  }

  getNewSortOrder(currentSortOrder: string) {
    let newSortOrder: string;
    const orders = ["asc", "desc", ""];
    const index = orders.indexOf(currentSortOrder);

    if (index === orders.length - 1) {
      newSortOrder = orders[0];
    } else {
      newSortOrder = orders[index + 1];
    }

    return newSortOrder;
  }

  getData() {
    const itemsPerPage = +this.itemsPerPage;
    const currentPage = +this.currentPage;
    const dataFrom = (currentPage - 1) * itemsPerPage;
    const dataTo = dataFrom + itemsPerPage;
    return this.data.slice(dataFrom, dataTo);
  }
}
