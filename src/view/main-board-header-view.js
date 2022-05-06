import AbstractView from '../framework/view/abstract-view';

const createTemplate = (cardsCount) => {
  if (cardsCount) {
    return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>\n';
  }
  return '<h2 class="films-list__title">There are no movies in our database</h2>';
};

export default class MainBoardHeaderView extends AbstractView{
  #cards;

  constructor(cards) {
    super();
    this.#cards = cards;
  }

  get template() {
    return createTemplate(this.#cards.length);
  }
}
