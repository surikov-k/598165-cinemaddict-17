import ListPresenter from './list-presenter';
import MoreButtonView from '../view/more-button-view';
import {remove, render, RenderPosition} from '../framework/render';
import {updateItem} from '../utils/common';

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

  constructor(cards, comments, boardCardsPresenters) {
    this.#cards = cards;
    this.#comments = comments;
    this.#boardCardsPresenters = boardCardsPresenters;
    this.#initialOrderCards = [...cards];
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
      this.#boardCardsPresenters
    );

    this.#cardListPresenter.setUpdateItem(this.#updateItem);

    this.renderList();
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

  #updateItem = (updatedCard) => {
    this.#cards = updateItem(this.#cards, updatedCard);
    this.#initialOrderCards = updateItem(this.#cards, updatedCard);
  };

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

