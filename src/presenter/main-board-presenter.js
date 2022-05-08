import DetailsPresenter from './details-presenter';
import ExtraCardsSectionView from '../view/extra-cards-section-view';
import ExtraSectionPresenter from './extra-section-presenter';
import MainCardsSectionView from '../view/main-cards-section-view';
import MainSectionPresenter from './main-section-presenter';
import MainBoardHeaderView from '../view/main-board-header-view';
import {render, RenderPosition} from '../framework/render';

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

    const detailsPresenter = new DetailsPresenter(this.#cardsModel, this.#commentsModel);

    new MainSectionPresenter(this.#cards, detailsPresenter)
      .init(cardsListView);

    new ExtraSectionPresenter(this.#cardsModel.getTopRated(2), detailsPresenter)
      .init(container, new ExtraCardsSectionView('Top rated'));

    new ExtraSectionPresenter(this.#cardsModel.getMostCommented(2), detailsPresenter)
      .init(container, new ExtraCardsSectionView('Most commented'));
  }
}
