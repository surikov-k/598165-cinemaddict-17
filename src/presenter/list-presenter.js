import {CardPresenter} from './card-presenter';

export default class ListPresenter {
  #handleViewAction = null;
  #listPresenters = new Map();
  #view = null;

  constructor(view, handleViewAction) {
    this.#view = view;
    this.#handleViewAction = handleViewAction;
  }

  render(cards) {
    cards
      .forEach((card) => {
        const cardPresenter = new CardPresenter(
          this.#view.element.querySelector('.films-list__container'),
          this.#handleViewAction,
        );

        cardPresenter.add(card);
        this.#listPresenters.set(card.id, cardPresenter);
      });
  }

  clear() {
    this.#listPresenters.forEach((presenter) => presenter.destroy());
    this.#listPresenters.clear();
  }

  addCard(card) {
    this.#listPresenters.get(card.id)?.add(card);
  }
}
