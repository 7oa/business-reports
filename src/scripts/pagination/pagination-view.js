export default class PaginationView {
  constructor() {
    this.itemsPerPageSelectSelector = "js-items-per-page";
    this.paginationItemSelector = "js-pagination-item";
  }

  getPaginationTemplate(pages, currentPage, pageCount) {
    const pagesList = pages.map((page) => {
      if (page !== "...") {
        return `
          <span 
            class="${this.paginationItemSelector} 
              pagination__item${page === +currentPage ? " active" : ""}" 
              data-page=${page}>
            ${page}
          </span>
        `;
      } else return `<span class="pagination__dots">${page}</span>`;
    });

    const template = `
      <div class="pagination">
        ${pageCount > 1 ? pagesList.join("") : ""}
      </div>
    `;

    return template;
  }

  _generateSelectOptions(options, selected) {
    return options.map((option) => {
      return `
        <option value="${option}" 
          ${option === selected ? "selected" : ""}>
          ${option}
        </option>
      `;
    });
  }

  getItemsPerPageTemplate(options, selected) {
    return `
      <div class="items-per-page">
        <div class="items-per-page__label">Items Per Page</div>
        <select class="items-per-page__select ${this.itemsPerPageSelectSelector}">
          ${this._generateSelectOptions(options, selected)}
        </select>
      </div>
    `;
  }
}
