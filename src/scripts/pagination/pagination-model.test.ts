import PaginationModel from "./pagination-model";

describe("PaginationModel", () => {
  let paginationModel: PaginationModel;

  describe("initialization", () => {
    it("should return pageCount: 2, pages: [1,2] when itemsPerPage is 2, dataLength 3 and page is 2", () => {
      paginationModel = new PaginationModel({
        itemsPerPage: 2,
        dataLength: 3,
      });
      expect(paginationModel.currentPage).toEqual(1);
      paginationModel.setPage(2);
      expect(paginationModel.currentPage).toEqual(2);
      expect(paginationModel.pageCount).toEqual(2);
      expect(paginationModel.pages).toEqual([1, 2]);
    });

    it("should return pageCount: 9, pages is contain dots when itemsPerPage is 10, dataLength 87 and page is 1", () => {
      paginationModel = new PaginationModel({
        itemsPerPage: 10,
        dataLength: 87,
      });
      expect(paginationModel.pageCount).toEqual(9);
      expect(paginationModel.pages).toContain("...");
    });

    it("should return pageCount: 1, pages: [1] when itemsPerPage is 10, dataLength 5 and page is 1", () => {
      paginationModel = new PaginationModel({
        itemsPerPage: 10,
        dataLength: 5,
      });
      expect(paginationModel.pageCount).toEqual(1);
      expect(paginationModel.pages).toEqual([1]);
    });

    it("should return pageCount: 16, pages: [1, '...', 3, 4, 5, 6, 7, '...', 16] when itemsPerPage is 5, dataLength 77 and page is 5", () => {
      paginationModel = new PaginationModel({
        itemsPerPage: 5,
        dataLength: 77,
      });
      paginationModel.setPage(5);
      expect(paginationModel.pageCount).toEqual(16);
      expect(paginationModel.pages).toEqual([1, "...", 3, 4, 5, 6, 7, "...", 16]);
    });

    it("should return pageCount:0, pages: [] when dataLength is 0", () => {
      paginationModel = new PaginationModel({
        itemsPerPage: 5,
        dataLength: 0,
      });
      expect(paginationModel.pageCount).toEqual(0);
      expect(paginationModel.pages).toEqual([]);
    });
  });

  describe("setItemsPerPage", () => {
    it("should drop currentPage to 1", () => {
      paginationModel = new PaginationModel({
        itemsPerPage: 20,
        dataLength: 3000,
      });
      paginationModel.setPage(10);
      expect(paginationModel.currentPage).toEqual(10);
      paginationModel.setItemsPerPage(1);
      expect(paginationModel.currentPage).toEqual(1);
      paginationModel.setPage(10);
      expect(paginationModel.currentPage).toEqual(10);
      paginationModel.setItemsPerPage(100);
      expect(paginationModel.currentPage).toEqual(1);
    });
  });
});
