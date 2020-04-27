import Data from "../data/data.js";
import Table from "../table/table.js";

export default class Report {
  constructor(url, props) {
    this.props = props;
    this.data = new Data().getData(url);
    this.render();
  }

  render() {
    return this.data.then((data) => {
      new Table({
        ...this.props,
        data,
      });
    });
  }
}
