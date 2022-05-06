import CardListPresenter from './card-list-presenter';
import MoreButtonView from '../view/more-button-view';
import {render, RenderPosition} from '../render';

const CARDS_PER_CLICK = 5;

export default class MainSectionPresenter {
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
    this.#listContainer = container.element
      .querySelector('.films-list__container');

    this.#moreButtonView = new MoreButtonView();
    render(this.#moreButtonView, this.#listContainer, RenderPosition.AFTEREND);

    this.#render(this.#cards.slice(0, this.#renderedCards));

    this.#moreButtonView.element.addEventListener('click', () => {
      this.#render(this.#cards.slice(this.#renderedCards, this.#renderedCards + CARDS_PER_CLICK));
      this.#renderedCards += CARDS_PER_CLICK;
    }
    );
  }

  #render(cards) {
    new CardListPresenter(cards, this.#detailsPresenter)
      .render(this.#listContainer);
    if (this.#renderedCards + CARDS_PER_CLICK >= this.#cards.length) {
      this.#moreButtonView.element.remove();
    }
  }
}

