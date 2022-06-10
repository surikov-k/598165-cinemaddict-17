import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const NoCardsHeader = {
  [FilterType.ALL]:  'There are no movies in our database',
  [FilterType.WATCHLIST]:  'There are no movies to watch now',
  [FilterType.HISTORY]:  'There are no watched movies now',
  [FilterType.FAVORITES]:  'There are no favorite movies now',
};

const createTemplate = (filterType) => `<section class="films-list">
    <h2 class="films-list__title">${NoCardsHeader[filterType]}</h2>
    <div class="films-list__container"></div>
    </section>`;
export default class NoCardsView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createTemplate(this.#filterType);
  }

}
