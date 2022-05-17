import {CardPresenter} from './card-presenter';

export default class ListPresenter {
  #container = null;
  #cards = null;
  #comments = null;
  #listCardsPresenters = new Map();
  #boardCardsPresenters = null;
  #updateItem = () => {};

  constructor(container, boardCardsPresenters) {
    this.#container = container;
    this.#boardCardsPresenters = boardCardsPresenters;
  }

  addCards(cards, comments) {
    this.#comments = comments;
    this.#cards = cards;
    cards
      .forEach((card) => {

        const cardPresenter = new CardPresenter(
          this.#container,
          this.#handleCardChange,
          this.#handleCloseDetails);
        cardPresenter.add(card, this.#getCardComments(card));

        this.#listCardsPresenters.set(card.id, cardPresenter);
        this.#boardCardsPresenters.push(cardPresenter);
      });
  }

  clearList() {
    this.#listCardsPresenters.forEach((presenter) => presenter.destroy());
    this.#listCardsPresenters.clear();
  }

  #getCardComments(card) {
    const comments = [];
    card.comments.forEach((commentId) => {
      comments.push(this.#comments.find((comment) => comment.id === commentId));
    });
    return comments;
  }

  #handleCardChange = (updatedCard) => {
    this.#updateItem(updatedCard);
    this.#boardCardsPresenters.forEach((cardPresenter) => {
      if (cardPresenter.id === updatedCard.id) {
        cardPresenter.add(updatedCard, this.#getCardComments(updatedCard));
      }
    });
  };

  #handleCloseDetails = () => {
    for (const presenter of this.#boardCardsPresenters.values()) {
      if (presenter.hasDetailsViewOpened()) {
        presenter.closeDetails();
        return;
      }
    }
  };

  setUpdateItem = (callback) => {
    this.#updateItem = callback;
  };
}
