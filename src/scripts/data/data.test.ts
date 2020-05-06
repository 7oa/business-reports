import Data from "./data";
import { data as promisedData } from "../../../mocks/data";

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
