import CardsExtraListView from '../view/cards-extra-list-view';
import CardsListPresenter from './cards-list-presenter';
import CardsListView from '../view/cards-list-view';
import DetailsPresenter from './details-presenter';
import MoreButtonView from '../view/more-button-view';
import {render} from '../render';

export default class CardsContainerPresenter {
  #cardsModel = null;
  #cards = null;

  init(container, cardsModel) {
    this.#cardsModel = cardsModel;
    this.#cards = [...this.#cardsModel.cards];

    const cardsListView = new CardsListView();
    const topListView = new CardsExtraListView();
    const popularListView = new CardsExtraListView();

    render(cardsListView, container);
    render(new MoreButtonView, cardsListView.element);
    render(topListView, container);
    render(popularListView, container);

    const detailsPresenter = new DetailsPresenter(this.#cards);

    new CardsListPresenter(this.#cards, detailsPresenter)
      .init(cardsListView);
    new CardsListPresenter(this.#cards.slice(0, 2), detailsPresenter)
      .init(topListView);
    new CardsListPresenter(this.#cards.slice(0, 2), detailsPresenter)
      .init(popularListView);
  }
}
