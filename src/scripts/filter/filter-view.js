export default class FilterView {
  constructor() {
    this.currenFilterSelector = "js-current-filters";
    this.filterFormSelector = "js-filter-form";
    this.filterResetSelector = "js-reset-filter";
    this.filterInputSelector = "js-filter-input";
    this.filterRemoveSelector = "js-remove-filter";
  }

  getCurrentFilterTemplate(data) {
    const currentFilter = data.map((el) => {
      return `
        <div class="current-filters__item">
          ${el.title}: ${el.min}-${el.max}
          <button class="current-filters__button ${this.filterRemoveSelector}" type="button" data-filter="${el.name}">&#10006;</button>
        </div>`;
    });
    return currentFilter.join("");
  }

  getFilterTemplate(data) {
    const filters = data.map(
      (filter) => `
        <div class="filter__row" data-filter="${filter.field}">
          <div class="filter__header">
            <div class="filter__title">${filter.title}</div>
            <div class="filter__description">
              (${filter.min}-${filter.max})
            </div>
          </div>
          <div class="filter-input">
            <input class="filter-input__input min ${this.filterInputSelector}" type="text" 
              name="${filter.field}" 
              min="${filter.min}" 
              max="${filter.max}" 
              value="${filter.min}" />
            <label class="filter-input__label">min</label> 
          </div>
          <div class="filter-input">
            <input class="filter-input__input max ${this.filterInputSelector}" type="text" 
              name="${filter.field}" 
              min="${filter.min}" 
              max="${filter.max}" 
              value="${filter.max}" />
            <label class="filter-input__label">max</label>
          </div>
        </div>
      `
    );

    const template = `
      <form class="filter ${this.filterFormSelector}">
        <div class="filter__inputs">${filters.join("")}</div>
        <div class="current-filters ${this.currenFilterSelector}"></div>
        <div class="filter__buttons">
          <button class="filter__button">Filter</button>
          <button class="filter__button ${this.filterResetSelector}">Reset</button>
        </div>
      </form>
    `;

    return template;
  }
}
