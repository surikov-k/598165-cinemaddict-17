import {createElement} from '../render';

const createTemplate = (cardsCount) => {
  if (cardsCount) {
    return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>\n';
  }
  return '<h2 class="films-list__title">There are no movies in our database</h2>';
};

export default class MainBoardHeaderView {
  #element;
  #cards;

  constructor(cards) {
    this.#cards = cards;
  }


  get template() {
    return createTemplate(this.#cards.length);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
