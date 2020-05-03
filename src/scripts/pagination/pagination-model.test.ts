import PaginationModel from "./pagination-model";

describe("FilterModel", () => {
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
});
