import { sortFunc } from "./utils";

describe("utils", () => {
  describe("sortFunc", () => {
    let sort: Function;

    it("shoud be 0 when keys are not equal", () => {
      sort = sortFunc("key");
      expect(sort({ id: 1 }, { key: 2 })).toEqual(0);

      sort = sortFunc("key", "desc");
      expect(sort({ id: 1 }, { key: 2 })).toEqual(0);
    });

    it("shoud be 0 when objects has not passed key", () => {
      sort = sortFunc("key");
      expect(sort({ id: 1 }, { some: 2 })).toEqual(0);

      sort = sortFunc("key", "desc");
      expect(sort({ id: 1 }, { some: 2 })).toEqual(0);
    });

    it("shoud return -1 when objects shoud not be changed", () => {
      sort = sortFunc("key");
      expect(sort({ key: 1 }, { key: 2 })).toEqual(-1);

      sort = sortFunc("key", "desc");
      expect(sort({ key: 2 }, { key: 1 })).toEqual(-1);
    });

    it("shoud return 1 when objects shoud be changed", () => {
      sort = sortFunc("key");
      expect(sort({ key: 3 }, { key: 2 })).toEqual(1);

      sort = sortFunc("key", "desc");
      expect(sort({ key: 2 }, { key: 3 })).toEqual(1);
    });

    it("shoud be sort asc by default", () => {
      sort = sortFunc("key");
      expect(sort({ key: 1 }, { key: 2 })).toEqual(-1);

      sort = sortFunc("key");
      expect(sort({ key: 22 }, { key: 2 })).toEqual(1);

      sort = sortFunc("key", "some");
      expect(sort({ key: 1 }, { key: 2 })).toEqual(-1);
    });
  });
});
