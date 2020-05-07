import FilterModel from "./filter-model";

describe("FilterModel", () => {
  let filterModel: FilterModel;

  beforeEach(() => {
    filterModel = new FilterModel({
      data,
      columns,
    });
  });

  describe("initialization", () => {
    it("should be initialized with passed params", () => {
      expect(filterModel.data).toEqual(data);
      expect(filterModel.columns).toEqual(columns);
    });

    it("array of selected filters should be empty initially", () => {
      expect(filterModel.selectedFilters).toEqual([]);
    });

    it("shoud be empty when data is empty", () => {
      filterModel = new FilterModel({
        data: [],
        columns: [],
      });
      expect(filterModel.filters).toEqual([]);
    });

    it("shoud return filters when there is two filterable columns", () => {
      const filters = [
        { field: "id", title: "ID", min: 1, max: 4 },
        { field: "age", title: "Age", min: 11, max: 67 },
      ];
      expect(filterModel.filters).toEqual(filters);
    });

    it("shoud return filters where max = min when all column values are equal", () => {
      filterModel = new FilterModel({
        data: [
          { id: 1, name: "Simon", age: 11 },
          { id: 2, name: "Gary", age: 11 },
        ],
        columns: [{ field: "age", title: "age", filter: true, sort: false }],
      });
      const filters = [{ field: "age", title: "age", min: 11, max: 11 }];
      expect(filterModel.filters).toEqual(filters);
    });

    it("shoud be empty when there is no filterable columns", () => {
      filterModel = new FilterModel({
        data: [
          { id: 1, name: "Simon", age: 1 },
          { id: 2, name: "Gary", age: 22 },
        ],
        columns: [{ field: "age", title: "age", filter: false, sort: false }],
      });
      expect(filterModel.filters).toEqual([]);
    });
  });

  describe("removeFilter", () => {
    it("should remove the selected filter even it's the only one selected filter", () => {
      const filter = [{ name: "age", title: "Age", min: "0", max: "100" }];
      filterModel.setFilter(filter);
      expect(filterModel.selectedFilters).toEqual(filter);
      filterModel.removeFilter("age");
      expect(filterModel.selectedFilters).toEqual([]);
    });

    it("should remove one selected filter", () => {
      const filter = [
        { name: "age", title: "Age", min: "0", max: "100" },
        { name: "id", title: "ID", min: "1", max: "1" },
      ];
      filterModel.setFilter(filter);
      expect(filterModel.selectedFilters).toEqual(filter);
      filterModel.removeFilter("id");
      expect(filterModel.selectedFilters).toEqual([
        { name: "age", title: "Age", min: "0", max: "100" },
      ]);
    });

    it("should leave unchanged the selected filter when removeFilter is called with a non-existing name", () => {
      const filter = [
        { name: "age", title: "Age", min: "0", max: "100" },
        { name: "id", title: "ID", min: "1", max: "1" },
      ];
      filterModel.setFilter(filter);
      expect(filterModel.selectedFilters).toEqual(filter);
      filterModel.removeFilter("name");
      expect(filterModel.selectedFilters).toEqual(filter);
    });

    it("should call setFilter method", () => {
      spyOn(filterModel, "setFilter");
      filterModel.removeFilter("age");
      expect(filterModel.setFilter).toHaveBeenCalled();
    });
  });

  // TODO: move validation to the filter model and cover it by tests
});

let data = [
  { id: 1, name: "Patric", age: 67 },
  { id: 2, name: "Elena", age: 23 },
  { id: 3, name: "Simon", age: 11 },
  { id: 4, name: "Gary", age: 22 },
];
let columns = [
  { field: "name", title: "Name", filter: false, sort: false },
  { field: "id", title: "ID", filter: true, sort: true },
  { field: "age", title: "Age", filter: true, sort: true },
];
