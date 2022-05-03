import CardView from '../view/card-view';
import {render} from '../render';

export default class CardsListPresenter {
  #cards = null;
  #detailsPresenter = null;

  constructor(cards, detailsPresenter) {
    this.#cards = cards;
    this.#detailsPresenter = detailsPresenter;
  }

  init(container) {
    const cardListContainer =
      container.element.querySelector('.films-list__container');

    this.#cards
      .forEach((card) => {
        const cardView = new CardView(card);
        cardView.element.querySelector('.film-card__link')
          .addEventListener('click', (evt) => {
            this.#detailsPresenter.open(evt.currentTarget.dataset.cardId);
          });

        render(cardView, cardListContainer);
      });
  }
}
