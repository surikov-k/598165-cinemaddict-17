import CardView from '../view/card-view';
import {render} from '../framework/render';

export default class CardListPresenter {
  #container = null;
  #detailsPresenter = null;

  constructor(container, detailsPresenter) {
    this.#container = container;
    this.#detailsPresenter = detailsPresenter;
  }

  addCards(cards) {
    cards
      .forEach((card) => {
        const cardView = new CardView(card);

        cardView.setOpenDetailsHandler(() => {
          this.#detailsPresenter.open(card);
        });

        render(cardView, this.#container);
      });
  }
}
