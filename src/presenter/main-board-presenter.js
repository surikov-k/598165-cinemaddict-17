import DetailsPresenter from './details-presenter';
import ExtraCardsSectionView from '../view/extra-cards-section-view';
import ExtraSectionPresenter from './extra-section-presenter';
import MainCardsSectionView from '../view/main-cards-section-view';
import MainSectionPresenter from './main-section-presenter';
import {render, RenderPosition} from '../render';
import MainBoardHeaderView from '../view/main-board-header-view';

export default class MainBoardPresenter {
  #cardsModel = null;
  #commentsModel = null;
  #cards = null;

  constructor(cardsModel, commentsModel) {
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  init(container) {
    this.#cards = [...this.#cardsModel.cards];

    const mainBoardHeader = new MainBoardHeaderView(this.#cards);
    const cardsListView = new MainCardsSectionView();
    render(cardsListView, container);
    render(mainBoardHeader, cardsListView.element, RenderPosition.AFTERBEGIN);

    if (!this.#cards.length) {
      return;
    }

    const topListView = new ExtraCardsSectionView('Top rated');
    const popularListView = new ExtraCardsSectionView('Most commented');

    render(topListView, container);
    render(popularListView, container);

    const detailsPresenter = new DetailsPresenter(this.#cardsModel, this.#commentsModel);

    new MainSectionPresenter(this.#cards, detailsPresenter)
      .init(cardsListView);

    new ExtraSectionPresenter(this.#cardsModel.getTopRated(2), detailsPresenter)
      .init(topListView);

    new ExtraSectionPresenter(this.#cardsModel.getMostCommented(2), detailsPresenter)
      .init(popularListView);
  }
}
