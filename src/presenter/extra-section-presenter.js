import CardListPresenter from './card-list-presenter';
import {render} from '../framework/render';

export default class ExtraSectionPresenter {
  #cards = null;
  #detailsPresenter = null;
  #listContainer = null;

  constructor(cards, detailsPresenter) {
    this.#cards = cards;
    this.#detailsPresenter = detailsPresenter;
  }

  init(container, extraSection) {
    if (!this.#cards.length) {
      return;
    }
    render(extraSection, container);

    this.#listContainer = extraSection.element
      .querySelector('.films-list__container');

    new CardListPresenter(this.#listContainer, this.#detailsPresenter)
      .addCards(this.#cards);
  }
}

