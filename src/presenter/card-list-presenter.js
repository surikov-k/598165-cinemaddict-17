import {CardPresenter} from './card-presenter';
import {updateItem} from '../utils/common';

export default class CardListPresenter {
  #container = null;
  #cards = null;
  #comments = null;
  #listPresenters = new Map();
  #boardPresenters = null;

  constructor(container, boardPresenters) {
    this.#container = container;
    this.#boardPresenters =boardPresenters;
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

        this.#listPresenters.set(card.id, cardPresenter);
        this.#boardPresenters.set(card.id, cardPresenter);
      });
  }

  clearList() {
    this.#listPresenters.forEach((presenter) => presenter.destroy());
    this.#listPresenters.clear();
  }

  #getCardComments(card) {
    const comments = [];
    card.comments.forEach((commentId) => {
      comments.push(this.#comments.find((comment) => comment.id === commentId));
    });
    return comments;
  }

  #handleCardChange = (updatedCard) => {
    this.#cards = updateItem(this.#cards, updatedCard);
    this.#listPresenters.get(updatedCard.id).add(updatedCard, this.#getCardComments(updatedCard));
  };

  #handleCloseDetails = () => {
    for (const presenter of this.#boardPresenters.values()) {
      if (presenter.hasDetailsViewOpened()) {
        presenter.closeDetails();
        return;
      }
    }
  };
}
