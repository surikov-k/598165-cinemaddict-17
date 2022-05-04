import CardListPresenter from './card-list-presenter';


export default class ExtraSectionPresenter {
  #cards = null;
  #detailsPresenter = null;
  #listContainer = null;

  constructor(cards, detailsPresenter) {
    this.#cards = cards;
    this.#detailsPresenter = detailsPresenter;
  }

  init(container) {
    this.#listContainer = container.element
      .querySelector('.films-list__container');

    new CardListPresenter(this.#cards, this.#detailsPresenter)
      .render(this.#listContainer);
  }
}

