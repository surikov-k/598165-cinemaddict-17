import ListPresenter from './list-presenter';
import MoreButtonView from '../view/more-button-view';
import {remove, render, RenderPosition} from '../framework/render';

import {CARDS_PER_CLICK} from '../const';

export default class SectionPresenter {
  #boardCardsPresenters = null;
  #cardListPresenter = null;
  #cards = null;
  #comments = null;
  #listContainer = null;
  #moreButtonView = null;
  #renderedCards = CARDS_PER_CLICK;
  #initialOrderCards = null;
  #handleCardChange = null;

  constructor(cards, comments, boardCardsPresenters, handleCardChange) {
    this.#cards = cards;
    this.#comments = comments;
    this.#boardCardsPresenters = boardCardsPresenters;
    this.#initialOrderCards = [...cards];
    this.#handleCardChange = handleCardChange;
  }

  init(container, view) {

    render(view, container);
    if (!this.#cards.length) {
      return;
    }

    this.#listContainer = view.element
      .querySelector('.films-list__container');

    this.#cardListPresenter = new ListPresenter(
      this.#listContainer,
      this.#boardCardsPresenters,
      this.#handleCardChange,
    );

    this.renderList();
  }

  updateCards(cards) {
    this.#cards = cards;
  }

  renderList() {
    this.#cardListPresenter
      .addCards(
        this.#cards.slice(0, this.#renderedCards),
        this.#comments
      );

    this.#moreButtonView = new MoreButtonView();
    if (this.#renderedCards <= this.#cards.length) {
      render(this.#moreButtonView, this.#listContainer, RenderPosition.AFTEREND);
    }

    this.#moreButtonView.setClickHandler(() => {
      this.#cardListPresenter
        .addCards(
          this.#cards.slice(this.#renderedCards, this.#renderedCards + CARDS_PER_CLICK),
          this.#comments
        );

      if (this.#renderedCards + CARDS_PER_CLICK >= this.#cards.length) {
        remove(this.#moreButtonView);
      }

      this.#renderedCards += CARDS_PER_CLICK;
    });
  }

  clearSection() {
    this.#cardListPresenter.clearList();
    remove(this.#moreButtonView);
  }

  get cards() {
    return this.#cards;
  }

  set cards(cards) {
    this.#cards = cards;
  }

  get initialOrderCards() {
    return this.#initialOrderCards;
  }
}

