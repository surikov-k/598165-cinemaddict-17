import MoreButtonView from '../view/more-button-view';
import {CardPresenter} from './card-presenter';
import {remove, render, RenderPosition} from '../framework/render';
import {sort} from '../utils/sort';

import {CARDS_PER_CLICK} from '../const';

export default class SectionPresenter {
  #cards = null;
  #comments = null;
  #listContainer = null;
  #moreButtonView = null;
  #renderedCards = CARDS_PER_CLICK;
  #initialOrderCards = null;
  #handleCardChange = null;
  #handleAddComment = null;
  #boardState = null;
  #listCardsPresenters = new Map();

  constructor(cards, comments, handleCardChange, handleAddComment, boardState) {
    this.#cards = cards;
    this.#comments = comments;
    this.#initialOrderCards = [...cards];
    this.#handleCardChange = handleCardChange;
    this.#handleAddComment = handleAddComment;
    this.#boardState = boardState;
  }

  init(container, view) {

    render(view, container);
    if (!this.#cards.length) {
      return;
    }

    this.#listContainer = view.element
      .querySelector('.films-list__container');

    this.render();
  }

  render() {
    this.addCards(
      this.#cards.slice(0, this.#renderedCards),
      this.#comments
    );

    this.#moreButtonView = new MoreButtonView();
    if (this.#renderedCards <= this.#cards.length) {
      render(this.#moreButtonView, this.#listContainer, RenderPosition.AFTEREND);
    }

    this.#moreButtonView.setClickHandler(() => {
      this.addCards(
        this.#cards.slice(this.#renderedCards, this.#renderedCards + CARDS_PER_CLICK),
        this.#comments
      );

      if (this.#renderedCards + CARDS_PER_CLICK >= this.#cards.length) {
        remove(this.#moreButtonView);
      }

      this.#renderedCards += CARDS_PER_CLICK;
    });
  }


  addCards(cards) {
    cards.forEach((card) => {
      const cardPresenter = new CardPresenter(
        this.#listContainer,
        card,
        this.#comments,
        this.#handleCardChange,
        this.#handleAddComment,
        this.#boardState);

      cardPresenter.add(card);
      this.#listCardsPresenters.set(card.id, cardPresenter);
    });
  }

  clear() {
    this.#listCardsPresenters.forEach((presenter) => presenter.destroy());
    this.#listCardsPresenters.clear();
    remove(this.#moreButtonView);
  }

  updateCard(card) {
    const presenter = this.#listCardsPresenters.get(card.id);
    if (presenter) {
      presenter.add(card);
    }
  }

  sort(type) {
    this.#cards = sort[type](this.#cards, this.#initialOrderCards);
    this.clear();
    this.render();
  }
}

