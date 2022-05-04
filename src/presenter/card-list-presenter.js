import CardView from '../view/card-view';
import {render} from '../render';

export default class CardListPresenter {
  #cards = null;
  #detailsPresenter = null;

  constructor(cards, detailsPresenter) {
    this.#cards = cards;
    this.#detailsPresenter = detailsPresenter;
  }

  render(container) {
    container.innerHTML = '';

    this.#cards
      .forEach((card) => {
        const cardView = new CardView(card);

        cardView.element.querySelector('.film-card__link')
          .addEventListener('click', () => {
            this.#detailsPresenter.open(card.id);
          });

        render(cardView, container);
      });
  }
}
