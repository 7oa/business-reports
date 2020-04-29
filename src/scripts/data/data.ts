import { IData } from "../interface/interface";

export default class Data implements IData {
  getData(url: string) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}
