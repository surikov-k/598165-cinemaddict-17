import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';

const ACTIVE_CLASS = 'sort__button--active';

const createTemplate = () => `
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;

export default class SortView extends AbstractView{
  get template() {
    return createTemplate();
  }

  setChangeTypeHandler = (callback) => {
    this._callback.changeType = callback;
    this.element.addEventListener('click', this.#changeTypeHandler);
  };

  #changeTypeHandler = (evt) => {
    const {target} = evt;
    if (target.tagName !== 'A' || target.classList.contains(ACTIVE_CLASS)) {
      return;
    }
    evt.preventDefault();
    this.#addActiveClass(target);
    this._callback.changeType(target.dataset.sortType);
  };

  #addActiveClass = (target) => {
    this.element.querySelectorAll('.sort__button')
      .forEach((button) => button
        .classList.remove(ACTIVE_CLASS));
    target.classList
      .add(ACTIVE_CLASS);
  };
}
