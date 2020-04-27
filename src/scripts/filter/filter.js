import FilterView from "./filter-view.js";
import FilterModel from "./filter-model.js";

export default class Filter {
  constructor(props) {
    this.tableElement = props.tableElement;
    this.filterSelector = props.filterSelector;
    this.view = new FilterView();
    this.model = new FilterModel({
      data: props.data,
      columns: props.columns,
    });
  }

  get elements() {
    return {
      filter: this.tableElement.querySelector(`.${this.filterSelector}`),
      currentFilters: this.tableElement.querySelector(`.${this.view.currenFilterSelector}`),
      form: this.tableElement.querySelector(`.${this.view.filterFormSelector}`),
      buttonResetFilter: this.tableElement.querySelector(`.${this.view.filterResetSelector}`),
      filterInputs: this.tableElement.querySelectorAll(`.${this.view.filterInputSelector}`),
    };
  }

  bindEvents() {
    const form = this.elements.form;
    const buttonResetFilter = this.elements.buttonResetFilter;
    const currentFilters = this.elements.currentFilters;

    currentFilters.addEventListener("click", (evt) => {
      const target = evt.target;
      if (target.classList.contains(this.view.filterRemoveSelector)) {
        const name = target.dataset.filter;
        this.removeFilter(name);
        this.tableElement
          .querySelectorAll(`.${this.view.filterInputSelector}[name=${name}]`)
          .forEach((el) => {
            if (el.classList.contains("min")) el.value = el.min;
            else el.value = el.max;
          });
      }
    });

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.filterSubmit();
    });

    form.addEventListener("change", (evt) => {
      evt.preventDefault();
      const input = evt.target;
      if (input.classList.contains(this.view.filterInputSelector)) {
        this.validation(input);
      }
    });

    form.addEventListener("keyup", (evt) => {
      evt.preventDefault();
      const input = evt.target;
      if (input.classList.contains(this.view.filterInputSelector)) {
        input.value = input.value.replace(/\D/g, "");
      }
    });

    buttonResetFilter.addEventListener("click", (evt) => {
      evt.preventDefault();
      form.reset();
      this.setFilter([]);
    });
  }

  filterSubmit() {
    const filterInputs = this.elements.filterInputs;
    let filter = [];
    filterInputs.forEach((input) => {
      const name = input.getAttribute("name");
      const currentFilter = filter.find((el) => el.name === name);
      const filterTitle = this.getFilters().find((item) => item.field === name).title;
      const value = input.value;
      const minValue = input.min;
      const maxValue = input.max;
      if (input.classList.contains("min") && value !== minValue) {
        if (currentFilter) {
          currentFilter.min = value;
        } else {
          filter.push({ name: name, title: filterTitle, min: value, max: maxValue });
        }
      }
      if (input.classList.contains("max") && value !== maxValue) {
        if (currentFilter) {
          currentFilter.max = value;
        } else {
          filter.push({ name: name, title: filterTitle, min: minValue, max: value });
        }
      }
    });
    this.setFilter(filter);
  }

  validation(input) {
    const name = input.name;
    const value = +input.value;
    const filter = this.getFilters().find((f) => f.field === input.name);

    if (value > filter.max) {
      input.value = filter.max;
    } else if (value < filter.min) {
      input.value = filter.min;
    } else {
      if (input.classList.contains("min")) {
        const maxValue = this.getMaxInputValue(name);
        if (value > maxValue) {
          input.value = maxValue;
        }
      } else {
        const minValue = this.getMinInputValue(name);
        if (value < minValue) {
          input.value = minValue;
        }
      }
    }
    if (input.value === "") {
      input.value = 0;
    }
  }

  getMinInputValue(name) {
    return this.tableElement.querySelector(`.${this.view.filterInputSelector}.min[name=${name}]`)
      .value;
  }

  getMaxInputValue(name) {
    return this.tableElement.querySelector(`.${this.view.filterInputSelector}.max[name=${name}]`)
      .value;
  }

  setFilter(filter) {
    if (JSON.stringify(filter) !== JSON.stringify(this.getFilter())) {
      this.model.setFilter(filter);
      this.tableElement.dispatchEvent(new CustomEvent("filterChange"));
      this.renderCurrentFilter();
    }
  }

  getFilter() {
    return this.model.filter;
  }

  getFilters() {
    return this.model.filters;
  }

  removeFilter(name) {
    this.model.removeFilter(name);
    this.tableElement.dispatchEvent(new CustomEvent("filterChange"));
    this.renderCurrentFilter();
  }

  renderCurrentFilter() {
    const filters = this.view.getCurrentFilterTemplate(this.getFilter());
    this.elements.currentFilters.innerHTML = filters;
  }

  renderFilters() {
    const filters = this.view.getFilterTemplate(this.getFilters());
    this.elements.filter.innerHTML = filters;
  }

  init() {
    if (this.getFilters().length > 0) {
      this.renderFilters();
      this.bindEvents();
    }
  }
}
