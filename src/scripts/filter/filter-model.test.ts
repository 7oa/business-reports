import { data } from "../../../mocks/data";
import { filterColumns } from "../../../mocks/columns";
import FilterModel from "./filter-model";

describe("FilterModel", () => {
  let filterModel: FilterModel;

  beforeEach(() => {
    filterModel = new FilterModel({
      data,
      columns: filterColumns,
    });
  });

  describe("set props", () => {
    it("set data", () => {
      expect(filterModel.data).toEqual(data);
    });

    it("set columns", () => {
      expect(filterModel.columns).toEqual(filterColumns);
    });

    it("set filter", () => {
      expect(filterModel.filter).toEqual([]);
    });

    it("set filters", () => {
      const filters = [
        { field: "id", title: "ID", min: 1, max: 4 },
        { field: "age", title: "Age", min: 11, max: 67 },
      ];
      expect(filterModel.filters).toEqual(filters);
    });
  });

  describe("setFilter", () => {
    it("set 1 filter", () => {
      const filter = [{ name: "age", title: "Age", min: "0", max: "100" }];
      filterModel.setFilter(filter);
      expect(filterModel.filter).toEqual(filter);
    });

    it("set 2 filters", () => {
      const filter = [
        { name: "age", title: "Age", min: "0", max: "100" },
        { name: "id", title: "ID", min: "1", max: "1" },
      ];
      filterModel.setFilter(filter);
      expect(filterModel.filter).toEqual(filter);
    });
  });

  describe("removeFilter", () => {
    it("remove 1 filter from 1", () => {
      filterModel.setFilter([{ name: "age", title: "Age", min: "0", max: "100" }]);
      filterModel.removeFilter("age");
      expect(filterModel.filter).toEqual([]);
    });

    it("remove 1 filter from 2", () => {
      const filter = [
        { name: "age", title: "Age", min: "0", max: "100" },
        { name: "id", title: "ID", min: "1", max: "1" },
      ];
      filterModel.setFilter(filter);
      filterModel.removeFilter("id");
      expect(filterModel.filter).toEqual([{ name: "age", title: "Age", min: "0", max: "100" }]);
    });
  });

  describe("spy setFilter", () => {
    beforeEach(() => {
      spyOn(filterModel, "setFilter");
    });

    it("setFilter was called in removeFilter", () => {
      filterModel.removeFilter("age");
      expect(filterModel.setFilter).toHaveBeenCalled();
    });
  });
});
