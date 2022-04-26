import {render} from '../render';
import CardView from '../view/card-view';

export default class CardsListPresenter {
  init(container, cardsCount) {
    const cardListContainer =
      container
        .getElement()
        .querySelector('.films-list__container');

    Array(cardsCount)
      .fill({})
      .forEach(() => {
        const card = new CardView();
        render(card, cardListContainer);
      });
  }
}
