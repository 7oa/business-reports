import TableModel from "./table-model";

describe("TableModel", () => {
  let tableModel: TableModel;

  beforeEach(() => {
    tableModel = new TableModel({
      data,
      itemsPerPage: 2,
    });
  });

  describe("set props", () => {
    it("should initialize variables correctly", () => {
      expect(tableModel.data).toEqual(data);
      expect(tableModel.initialData).toEqual(data);
      expect(tableModel.itemsPerPage).toEqual(2);
      expect(tableModel.currentPage).toEqual(1);
      expect(tableModel.filter).toEqual([]);
      expect(tableModel.sortOrder).toEqual("");
      expect(tableModel.sortField).toEqual("");
    });
  });

  describe("setSort", () => {
    it("should call updateData method", () => {
      spyOn(tableModel, "updateData");
      tableModel.setSort("age", "asc");
      expect(tableModel.updateData).toHaveBeenCalled();
    });
  });

  describe("setFilter", () => {
    it("should call updateData method", () => {
      spyOn(tableModel, "updateData");
      tableModel.setFilter([]);
      expect(tableModel.updateData).toHaveBeenCalled();
    });
  });

  describe("updateData", () => {
    it("should call sortData and filterData methods", () => {
      spyOn(tableModel, "sortData");
      spyOn(tableModel, "filterData");
      tableModel.updateData();
      expect(tableModel.sortData).toHaveBeenCalled();
      expect(tableModel.filterData).toHaveBeenCalled();
    });
  });

  describe("sortData", () => {
    it("shoud return data without sort", () => {
      tableModel.sortField = "age";
      tableModel.sortOrder = "";
      expect(tableModel.sortData(data)).toEqual(data);
    });

    it("shoud return data with sort asc", () => {
      tableModel.sortField = "age";
      tableModel.sortOrder = "asc";
      expect(tableModel.sortData(data)).toEqual(dataSortAsc);
    });

    it("shoud return data with sort desc", () => {
      tableModel.sortField = "age";
      tableModel.sortOrder = "desc";
      expect(tableModel.sortData(data)).toEqual(dataSortDesc);
    });

    it("shoud be empty when data is empty", () => {
      tableModel.sortField = "age";
      tableModel.sortOrder = "desc";
      expect(tableModel.sortData([])).toEqual([]);
    });

    it("shoud return 1 element when data consists of 1 element", () => {
      const someData = [{ id: 1, name: "Name", age: 22 }];
      tableModel.sortField = "age";
      tableModel.sortOrder = "desc";
      expect(tableModel.sortData(someData)).toEqual(someData);
    });

    it("shoud return the same if sorted props are equal (age: 30, age: 30, age: 30, ..)", () => {
      const someData = [{ age: 30 }, { age: 30 }, { age: 30 }];
      tableModel.sortField = "age";
      tableModel.sortOrder = "desc";
      expect(tableModel.sortData(someData)).toEqual(someData);
    });
  });

  describe("filterData", () => {
    it("should return data filtered by age 23-100", () => {
      const dataFilter = [
        { id: 1, name: "Patric", age: 67 },
        { id: 2, name: "Elena", age: 23 },
      ];
      tableModel.filter = [{ name: "age", title: "Age", min: "23", max: "100" }];
      expect(tableModel.filterData(data)).toEqual(dataFilter);
    });

    it("should return data filtered by age 0-11", () => {
      const dataFilter = [{ id: 3, name: "Simon", age: 11 }];
      tableModel.filter = [{ name: "age", title: "Age", min: "0", max: "11" }];
      expect(tableModel.filterData(data)).toEqual(dataFilter);
    });
  });

  describe("getNewSortOrder", () => {
    it("should return desc when passed asc", () => {
      expect(tableModel.getNewSortOrder("asc")).toEqual("desc");
    });

    it("should return empty string when passed desc", () => {
      expect(tableModel.getNewSortOrder("desc")).toEqual("");
    });

    it("should return asc when passed empty string", () => {
      expect(tableModel.getNewSortOrder("")).toEqual("asc");
    });

    it("should return asc when passed incorrect value", () => {
      expect(tableModel.getNewSortOrder("something")).toEqual("asc");
    });
  });

  describe("getData", () => {
    it("should return 2 items on the first page", () => {
      const result = [
        { id: 1, name: "Patric", age: 67 },
        { id: 2, name: "Elena", age: 23 },
      ];
      expect(tableModel.getData()).toEqual(result);
    });

    it("should return 2 items on the second page", () => {
      const result = [
        { id: 3, name: "Simon", age: 11 },
        { id: 4, name: "Gary", age: 22 },
      ];
      tableModel.currentPage = 2;
      expect(tableModel.getData()).toEqual(result);
    });

    it("should return 1 item on the second page", () => {
      const result = [{ id: 4, name: "Gary", age: 22 }];
      tableModel.currentPage = 2;
      tableModel.itemsPerPage = 3;
      expect(tableModel.getData()).toEqual(result);
    });

    it("should return 100 items on the first page", () => {
      tableModel.currentPage = 1;
      tableModel.itemsPerPage = 100;
      expect(tableModel.getData()).toEqual(data);
    });

    it("should be empty when data is empty", () => {
      tableModel.data = [];
      expect(tableModel.getData()).toEqual([]);
    });

    it("should be empty on the second page when data length is 10 and items per page is 10", () => {
      tableModel.data = Array(10).fill({ id: 1 });
      tableModel.currentPage = 2;
      tableModel.itemsPerPage = 10;
      expect(tableModel.getData()).toEqual([]);
    });
  });
});

const data = [
  { id: 1, name: "Patric", age: 67 },
  { id: 2, name: "Elena", age: 23 },
  { id: 3, name: "Simon", age: 11 },
  { id: 4, name: "Gary", age: 22 },
];
const dataSortAsc = [
  { id: 3, name: "Simon", age: 11 },
  { id: 4, name: "Gary", age: 22 },
  { id: 2, name: "Elena", age: 23 },
  { id: 1, name: "Patric", age: 67 },
];
const dataSortDesc = [
  { id: 1, name: "Patric", age: 67 },
  { id: 2, name: "Elena", age: 23 },
  { id: 4, name: "Gary", age: 22 },
  { id: 3, name: "Simon", age: 11 },
];
