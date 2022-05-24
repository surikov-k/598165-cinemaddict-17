import {CardPresenter} from './card-presenter';

export default class ListPresenter {
  #container = null;
  #cards = null;
  #comments = null;
  #listCardsPresenters = new Map();
  #boardCardsPresenters = null;
  #handleCardChange = null;
  #handleAddComment = () => {};

  constructor(container, boardCardsPresenters, handleCardChange, handleAddComment) {
    this.#container = container;
    this.#boardCardsPresenters = boardCardsPresenters;
    this.#handleCardChange = handleCardChange;
    this.#handleAddComment = handleAddComment;
  }

  addCards(cards, comments) {
    this.#comments = comments;
    this.#cards = cards;
    cards
      .forEach((card) => {

        const cardPresenter = new CardPresenter(
          this.#container,
          card,
          this.#comments,
          this.#handleCardChange,
          this.#handleCloseDetails,
          this.#handleAddComment);

        cardPresenter.add(card);

        this.#listCardsPresenters.set(card.id, cardPresenter);
        this.#boardCardsPresenters.push(cardPresenter);
      });

  }

  clearList() {
    this.#handleCloseDetails();
    this.#removeFromBoardCardsPresenters();
    this.#listCardsPresenters.forEach((presenter) => presenter.destroy());
    this.#listCardsPresenters.clear();
  }

  #handleCloseDetails = () => {
    for (const presenter of this.#boardCardsPresenters) {
      if (presenter.hasDetailsViewOpened()) {
        presenter.closeDetails();
        return;
      }
    }
  };

  #removeFromBoardCardsPresenters() {
    const keepBoardCardsPresenters = this.#boardCardsPresenters
      .filter((presenter) => ![...this.#listCardsPresenters.values()]
        .includes(presenter));

    this.#boardCardsPresenters.length = 0;
    this.#boardCardsPresenters.push(...keepBoardCardsPresenters);
  }
}
