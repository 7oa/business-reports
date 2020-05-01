import {
  data,
  dataSortAsc,
  dataSortDesc,
  dataFilter,
  dataFilter2,
  dataPage1Items2,
  dataPage2Items2,
  dataPage2Items3,
} from "../../../mocks/data";
import TableModel from "./table-model";

describe("TableModel", () => {
  let tableModel: TableModel;

  beforeEach(() => {
    tableModel = new TableModel({
      data,
      itemsPerPage: 2,
    });
  });

  describe("set TableModel props", () => {
    it("set data", () => {
      expect(tableModel.data).toEqual(data);
    });
    it("set initialData equal data", () => {
      expect(tableModel.initialData).toEqual(data);
    });
    it("set itemsPerPage", () => {
      expect(tableModel.itemsPerPage).toEqual(2);
    });
    it("set currentPage", () => {
      expect(tableModel.currentPage).toEqual(1);
    });
    it("set filter", () => {
      expect(tableModel.filter).toEqual([]);
    });
    it("set sortOrder", () => {
      expect(tableModel.sortOrder).toEqual("");
    });
    it("set sortField", () => {
      expect(tableModel.sortField).toEqual("");
    });
  });

  describe("setSort", () => {
    it("sortOrder shoud be 'asc', sortField shoud be 'age'", () => {
      tableModel.setSort("age", "asc");
      expect(tableModel.sortOrder).toEqual("asc");
      expect(tableModel.sortField).toEqual("age");
    });
  });

  describe("setFilter", () => {
    it("filter set to []", () => {
      tableModel.setFilter([]);
      expect(tableModel.filter).toEqual([]);
    });
    it("filter set to array with 1 object", () => {
      const filter = [{ name: "age", title: "Age", min: "1", max: "20" }];
      tableModel.setFilter(filter);
      expect(tableModel.filter).toEqual(filter);
    });
    it("filter set to array with 2 objects", () => {
      const filter = [
        { name: "id", title: "ID", min: "2", max: "122" },
        { name: "age", title: "Age", min: "1", max: "20" },
      ];
      tableModel.setFilter(filter);
      expect(tableModel.filter).toEqual(filter);
    });
  });

  // describe("updateData", () => {});
  describe("sortData", () => {
    it("without sort", () => {
      tableModel.sortField = "age";
      tableModel.sortOrder = "";
      expect(tableModel.sortData(data)).toEqual(data);
    });
    it("sort asc", () => {
      tableModel.sortField = "age";
      tableModel.sortOrder = "asc";
      expect(tableModel.sortData(data)).toEqual(dataSortAsc);
    });
    it("sort desc", () => {
      tableModel.sortField = "age";
      tableModel.sortOrder = "desc";
      expect(tableModel.sortData(data)).toEqual(dataSortDesc);
    });
  });

  describe("filterData", () => {
    it("age 23-100", () => {
      tableModel.filter = [{ name: "age", title: "Age", min: "23", max: "100" }];
      expect(tableModel.filterData(data)).toEqual(dataFilter);
    });
    it("age 0-11", () => {
      tableModel.filter = [{ name: "age", title: "Age", min: "0", max: "11" }];
      expect(tableModel.filterData(data)).toEqual(dataFilter2);
    });
  });

  describe("getNewSortOrder", () => {
    it("getNewSortOrder('asc') should return 'desc'", () => {
      expect(tableModel.getNewSortOrder("asc")).toEqual("desc");
    });
    it("getNewSortOrder('desc') should return ''", () => {
      expect(tableModel.getNewSortOrder("desc")).toEqual("");
    });
    it("getNewSortOrder('') should return 'asc'", () => {
      expect(tableModel.getNewSortOrder("")).toEqual("asc");
    });
  });

  describe("getData", () => {
    it("return 2 items on page 1", () => {
      expect(tableModel.getData()).toEqual(dataPage1Items2);
    });
    it("return 2 items on page 2", () => {
      tableModel.currentPage = 2;
      expect(tableModel.getData()).toEqual(dataPage2Items2);
    });
    it("return 3 items on page 2", () => {
      tableModel.currentPage = 2;
      tableModel.itemsPerPage = 3;
      expect(tableModel.getData()).toEqual(dataPage2Items3);
    });
    it("return 100 items on page 1", () => {
      tableModel.currentPage = 1;
      tableModel.itemsPerPage = 100;
      expect(tableModel.getData()).toEqual(data);
    });
  });
});
