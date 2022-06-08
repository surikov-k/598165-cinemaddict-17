import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';

const ACTIVE_CLASS = 'sort__button--active';

const createTemplate = (currentSortType) => `
  <ul class="sort">
    <li>
      <a 
      href="#" 
      class="sort__button ${currentSortType === SortType.DEFAULT ? ACTIVE_CLASS : ''}" 
      data-sort-type="${SortType.DEFAULT}">Sort by default</a>
    </li>
    <li>
      <a 
      href="#" 
      class="sort__button ${currentSortType === SortType.DATE ? ACTIVE_CLASS : ''}" 
      data-sort-type="${SortType.DATE}">Sort by date</a>
    </li>
    <li>
      <a 
      href="#" 
      class="sort__button ${currentSortType === SortType.RATING ? ACTIVE_CLASS : ''}" 
      data-sort-type="${SortType.RATING}">Sort by rating</a>
    </li>
  </ul>`;

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createTemplate(this.#currentSortType);
  }

  setChangeTypeHandler = (callback) => {
    this._callback.changeType = callback;
    this.element.addEventListener('click', this.#changeTypeHandler);
  };

  #changeTypeHandler = (evt) => {
    const {target} = evt;
    if (target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.changeType(target.dataset.sortType);
  };
}
