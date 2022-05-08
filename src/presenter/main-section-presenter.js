import {CARDS_PER_CLICK} from '../const';
import CardListPresenter from './card-list-presenter';
import MoreButtonView from '../view/more-button-view';
import {remove, render, RenderPosition} from '../framework/render';

export default class MainSectionPresenter {
  #cardListPresenter = null;
  #cards = null;
  #detailsPresenter = null;
  #listContainer = null;
  #moreButtonView = null;
  #renderedCards = CARDS_PER_CLICK;

  constructor(cards, detailsPresenter) {
    this.#cards = cards;
    this.#detailsPresenter = detailsPresenter;
  }

  init(container) {
    if (!this.#cards.length) {
      return;
    }
    this.#listContainer = container.element
      .querySelector('.films-list__container');

    this.#cardListPresenter = new CardListPresenter(
      this.#listContainer,
      this.#detailsPresenter
    );
    this.#cardListPresenter.addCards(this.#cards.slice(0, this.#renderedCards));

    if (this.#renderedCards <= this.#cards.length) {
      this.#moreButtonView = new MoreButtonView();
      render(this.#moreButtonView, this.#listContainer, RenderPosition.AFTEREND);
    }

    this.#moreButtonView.setClickHandler(() => {
      this.#cardListPresenter
        .addCards(this.#cards.slice(this.#renderedCards, this.#renderedCards + CARDS_PER_CLICK));

      if (this.#renderedCards + CARDS_PER_CLICK >= this.#cards.length) {
        remove(this.#moreButtonView);
      }
      this.#renderedCards += CARDS_PER_CLICK;
    });
  }
}

