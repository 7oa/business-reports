import { IFilterModel } from "../interface/interface";
import { SelectedFilter, Column } from "../interface/types";

export default class FilterModel implements IFilterModel {
  selectedFilters: SelectedFilter[] = [];
  data: object[];
  columns: Column[];

  constructor(props: { data: object[]; columns: Column[] }) {
    this.data = props.data;
    this.columns = props.columns;
  }

  get filters() {
    return this.columns
      .filter((el) => el.filter === true)
      .map((column) => {
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
    const filter = this.selectedFilters.filter((el) => el.name !== name);
    this.setFilter(filter);
  }

  setFilter(filter: SelectedFilter[]) {
    this.selectedFilters = filter;
  }

  validationMin(currentValue: number, currentMaxValue: number, criticalMinValue: number): string {
    if (currentValue > currentMaxValue) {
      return currentMaxValue.toString();
    } else if (currentValue <= criticalMinValue) {
      return criticalMinValue.toString();
    } else {
      return currentValue.toString();
    }
  }

  validationMax(currentValue: number, currentMinValue: number, criticalMaxValue: number): string {
    if (currentValue <= currentMinValue) {
      return currentMinValue.toString();
    } else if (currentValue > criticalMaxValue) {
      return criticalMaxValue.toString();
    } else {
      return currentValue.toString();
    }
  }
}
