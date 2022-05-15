import CardListPresenter from './card-list-presenter';
import {render} from '../framework/render';

export default class ExtraSectionPresenter {
  #boardPresenters = null;
  #cards = null;
  #comments = null;
  #listContainer = null;

  constructor(cards, comments, boardPresenters) {
    this.#cards = cards;
    this.#comments = comments;
    this.#boardPresenters = boardPresenters;
  }

  init(container, extraSection) {
    if (!this.#cards.length) {
      return;
    }
    render(extraSection, container);

    this.#listContainer = extraSection.element
      .querySelector('.films-list__container');

    new CardListPresenter(this.#listContainer, this.#boardPresenters)
      .addCards(this.#cards, this.#comments);
  }
}

