import CardsExtraListView from '../view/cards-extra-list-view';
import CardsListPresenter from './cards-list-presenter';
import CardsListView from '../view/cards-list-view';
import DetailsPresenter from './details-presenter';
import MoreButtonView from '../view/more-button-view';
import {render} from '../render';

export default class CardsContainerPresenter {

  init(container, cardsModel, commentsModel) {
    this.cardsModel = cardsModel;
    this.commentsModel = commentsModel;
    this.cards = [...this.cardsModel.getCards()];


    const cardsListView = new CardsListView();
    const topListView = new CardsExtraListView();
    const popularListView = new CardsExtraListView();

    render(cardsListView, container);
    render(new MoreButtonView, cardsListView.getElement());
    render(topListView, container);
    render(popularListView, container);

    new CardsListPresenter().init(cardsListView, this.cards);
    new CardsListPresenter().init(topListView, this.cards.slice(0, 2));
    new CardsListPresenter().init(popularListView, this.cards.slice(0, 2));


    const detailsPresenter = new DetailsPresenter(this.cards);
    detailsPresenter.init(container);
  }
}
