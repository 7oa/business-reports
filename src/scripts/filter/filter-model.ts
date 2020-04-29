import { IFilterModel } from "../interface/interface";
import { SelectedFilter, Column } from "../interface/types";

export default class FilterModel implements IFilterModel {
  filter: SelectedFilter[] = [];
  data: object[];
  columns: Column[];

  constructor(props: { data: object[]; columns: Column[] }) {
    this.data = props.data;
    this.columns = props.columns;
  }

  get filters() {
    return this.columns.map((column) => {
      let firstElValue = this.data[0][column.field];
      let max = firstElValue;
      let min = firstElValue;
      this.data.forEach((el) => {
        if (el[column.field] > max) max = el[column.field];
        if (el[column.field] < min) min = el[column.field];
      });
      return {
        field: column.field,
        title: column.title,
        min: parseInt(min),
        max: parseInt(max),
      };
    });
  }

  removeFilter(name: string) {
    const filter = this.filter.filter((el) => el.name !== name);
    this.setFilter(filter);
  }

  setFilter(filter: SelectedFilter[]) {
    this.filter = filter;
  }
}
