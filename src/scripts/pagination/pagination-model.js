export default class PaginationModel {
  constructor(props) {
    this.itemsPerPage = props.itemsPerPage;
    this.dataLength = props.dataLength;
    this.currentPage = 1;
  }

  get pageCount() {
    return Math.ceil(this.dataLength / this.itemsPerPage);
  }

  get pages() {
    const current = +this.currentPage;
    const length = +this.pageCount;
    const delta = 4;
    const range = {
      start: Math.round(current - delta / 2),
      end: Math.round(current + delta / 2),
    };

    function getRange(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, i) => i + start);
    }

    if (range.start - 1 === 1 || range.end + 1 === length) {
      range.start += 1;
      range.end += 1;
    }

    let pages =
      current > delta
        ? getRange(Math.min(range.start, length - delta), Math.min(range.end, length))
        : getRange(1, Math.min(length, delta + 1));

    const withDots = (value, pair) => (pages.length + 1 !== length ? pair : [value]);

    if (pages[0] !== 1) {
      pages = withDots(1, [1, "..."]).concat(pages);
    }

    if (pages[pages.length - 1] < length) {
      pages = pages.concat(withDots(length, ["...", length]));
    }

    return pages;
  }

  setItemsPerPage(itemsPerPage) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
  }

  setPage(page) {
    this.currentPage = page;
  }

  setDataLength(length) {
    this.dataLength = length;
  }
}
