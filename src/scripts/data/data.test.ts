import Data from "./data";

const promisedData = [
  { id: 1, name: "Patric", age: 67 },
  { id: 2, name: "Elena", age: 23 },
  { id: 3, name: "Simon", age: 11 },
  { id: 4, name: "Gary", age: 22 },
];

describe("Data", () => {
  let data: Data;

  beforeEach(() => {
    data = new Data();
  });

  describe("getData", () => {
    it("shoud return promisedData", () => {
      spyOn(data, "getData").and.returnValue(Promise.resolve(promisedData));

      data.getData("").then((result) => {
        expect(result).toEqual(promisedData);
      });
    });

    it("shoud catch error", async () => {
      try {
        await data.getData("");
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
});
