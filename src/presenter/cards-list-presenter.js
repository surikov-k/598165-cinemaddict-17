import {render} from '../render';
import CardView from '../view/card-view';

export default class CardsListPresenter {
  init(container, cards) {
    const cardListContainer =
      container
        .getElement()
        .querySelector('.films-list__container');

    cards
      .forEach((card) => {
        const cardView = new CardView(card);
        render(cardView, cardListContainer);
      });
  }
}
