import AbstractView from '../framework/view/abstract-view';

const createTemplate = (filter) => `
  <nav class="main-navigation">
    ${filter.reduce((template, item) => {
    template += `
      <a href="#${item.name.replace(/\s+/g, '').toLowerCase()}" class="main-navigation__item">${item.name}<span class="main-navigation__item-count">${item.count}</span></a>`;
    return template;}, '')
}
  </nav>`;

export default class FilterView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createTemplate(this.#filter);
  }
}
