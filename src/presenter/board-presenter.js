import ExtraCardsSectionView from '../view/extra-cards-section-view';
import ExtraSectionPresenter from './extra-section-presenter';
import MainCardsSectionView from '../view/main-cards-section-view';
import MainSectionPresenter from './main-section-presenter';
import MainBoardHeaderView from '../view/main-board-header-view';
import {render, RenderPosition} from '../framework/render';

export default class BoardPresenter {
  #cardsModel = null;
  #commentsModel = null;
  #comments = null;
  #cards = null;
  #boardPresenters = new Map();

  constructor(cardsModel, commentsModel) {
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  init(container) {
    this.#cards = [...this.#cardsModel.cards];
    this.#comments = [...this.#commentsModel.comments];

    const mainBoardHeaderView = new MainBoardHeaderView(this.#cards);
    const cardsListView = new MainCardsSectionView();

    render(cardsListView, container);
    render(mainBoardHeaderView, cardsListView.element, RenderPosition.AFTERBEGIN);

    new MainSectionPresenter(this.#cards, this.#comments, this.#boardPresenters)
      .init(cardsListView);

    new ExtraSectionPresenter(
      this.#cardsModel.getTopRated(2),
      this.#comments,
      this.#boardPresenters)
      .init(container, new ExtraCardsSectionView('Top rated'));

    new ExtraSectionPresenter(
      this.#cardsModel.getMostCommented(2),
      this.#comments,
      this.#boardPresenters)
      .init(container, new ExtraCardsSectionView('Most commented'));
  }

}
