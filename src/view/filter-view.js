import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';
const ACTIVE_CLASS = 'main-navigation__item--active';

const createTemplate = (filter, currentFilter) => `
  <nav class="main-navigation">
    ${filter.reduce((template, item) => {
    template += `
      <a 
      href="#${item.type}" 
      class="main-navigation__item ${item.type === currentFilter ? ACTIVE_CLASS : ''}">
          ${item.name}
          ${item.type !== FilterType.ALL
    ? `<span class="main-navigation__item-count">${item.count}</span>`
    : ''}
      </a>`;
    return template;}, '')
}
  </nav>`;

export default class FilterView extends AbstractView {
  #filter = null;
  #currentFilter  = null;

  constructor(filter, currentFilter) {
    super();
    this.#filter = filter;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createTemplate(this.#filter, this.#currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    const {target, target: {classList: targetClasses}} = evt;
    if (!(targetClasses.contains('main-navigation__item')
      || targetClasses.contains('main-navigation__item-count'))) {
      return;
    }
    evt.preventDefault();
    let link = target;
    if (target.tagName === 'SPAN') {
      link = target.closest('.main-navigation__item');
    }
    const [,filterType] = link.href.match(/#(.+)$/);
    this._callback.filterTypeChange(filterType);
  };
}
