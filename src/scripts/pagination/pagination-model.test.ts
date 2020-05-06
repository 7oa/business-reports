import PaginationModel from "./pagination-model";

describe("PaginationModel", () => {
  let paginationModel: PaginationModel;

  describe("set props itemsPerPage: 2, dataLength: 3, page: 2", () => {
    beforeEach(() => {
      paginationModel = new PaginationModel({
        itemsPerPage: 2,
        dataLength: 3,
      });
      paginationModel.setPage(2);
    });

    it("set currentPage", () => {
      expect(paginationModel.currentPage).toEqual(2);
    });

    it("set pageCount", () => {
      expect(paginationModel.pageCount).toEqual(2);
    });

    it("set pages", () => {
      expect(paginationModel.pages).toEqual([1, 2]);
    });
  });

  describe("set props itemsPerPage: 10, dataLength: 87, page: 1", () => {
    beforeEach(() => {
      paginationModel = new PaginationModel({
        itemsPerPage: 10,
        dataLength: 87,
      });
    });

    it("set pageCount", () => {
      expect(paginationModel.pageCount).toEqual(9);
    });

    it("set pages", () => {
      expect(paginationModel.pages).toEqual([1, 2, 3, 4, 5, "...", 9]);
    });
  });

  describe("set props itemsPerPage: 10, dataLength: 5, page: 1", () => {
    beforeEach(() => {
      paginationModel = new PaginationModel({
        itemsPerPage: 10,
        dataLength: 5,
      });
    });

    it("set pageCount", () => {
      expect(paginationModel.pageCount).toEqual(1);
    });

    it("set pages", () => {
      expect(paginationModel.pages).toEqual([1]);
    });
  });

  describe("set props itemsPerPage: 5, dataLength: 77, page: 5", () => {
    beforeEach(() => {
      paginationModel = new PaginationModel({
        itemsPerPage: 5,
        dataLength: 77,
      });
      paginationModel.setPage(5);
    });

    it("set pageCount", () => {
      expect(paginationModel.pageCount).toEqual(16);
    });

    it("set pages", () => {
      expect(paginationModel.pages).toEqual([1, "...", 3, 4, 5, 6, 7, "...", 16]);
    });
  });

  describe("setItemsPerPage", () => {
    it("itemsPerPage shoud be 1, currentPage shoud be 1", () => {
      paginationModel.setItemsPerPage(1);
      expect(paginationModel.itemsPerPage).toEqual(1);
      expect(paginationModel.currentPage).toEqual(1);
    });
    it("itemsPerPage shoud be 100, currentPage shoud be 1", () => {
      paginationModel.setItemsPerPage(100);
      expect(paginationModel.itemsPerPage).toEqual(100);
      expect(paginationModel.currentPage).toEqual(1);
    });
  });

  describe("setPage", () => {
    it("page shoud be 10", () => {
      paginationModel.setPage(10);
      expect(paginationModel.currentPage).toEqual(10);
    });
    it("page shoud be 1", () => {
      paginationModel.setPage(1);
      expect(paginationModel.currentPage).toEqual(1);
    });
  });

  describe("setDataLength", () => {
    it("dataLength shoud be 100", () => {
      paginationModel.setDataLength(100);
      expect(paginationModel.dataLength).toEqual(100);
    });
    it("dataLength shoud be 22", () => {
      paginationModel.setDataLength(22);
      expect(paginationModel.dataLength).toEqual(22);
    });
  });
});
