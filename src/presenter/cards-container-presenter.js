import CardsExtraListView from '../view/cards-extra-list-view';
import CardsListPresenter from './cards-list-presenter';
import CardsListView from '../view/cards-list-view';
import MoreButtonView from '../view/more-button-view';
import {render} from '../render';
import DetailsPresenter from './details-presenter';

export default class CardsContainerPresenter {

  init(container) {
    const cardsListView = new CardsListView();
    const topListView = new CardsExtraListView();
    const popularListView = new CardsExtraListView();

    render(cardsListView, container);
    render(new MoreButtonView, cardsListView.getElement());
    render(topListView, container);
    render(popularListView, container);

    new CardsListPresenter().init(cardsListView, 5);
    new CardsListPresenter().init(topListView, 2);
    new CardsListPresenter().init(popularListView, 2);

    new DetailsPresenter().init(container);
  }
}
