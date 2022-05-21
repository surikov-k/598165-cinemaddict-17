import ExtraCardsSectionView from '../view/extra-cards-section-view';
import MainCardsSectionView from '../view/main-cards-section-view';
import SectionPresenter from './section-presenter';
import SortView from '../view/sort-view';
import SortingPresenter from './sorting-presenter';
import {render, RenderPosition} from '../framework/render';

export default class BoardPresenter {
  #cardsModel = null;
  #commentsModel = null;
  #comments = null;
  #cards = null;
  #boardCardsPresenters = [];

  constructor(cardsModel, commentsModel) {
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  init(container) {
    this.#cards = [...this.#cardsModel.cards];
    this.#comments = [...this.#commentsModel.comments];

    const mainCardsSectionView = new MainCardsSectionView(this.#cards.length);
    const topCardsSectionView = new ExtraCardsSectionView('Top rated');
    const popularCardsSectionView = new ExtraCardsSectionView('Most commented');

    const mainSectionPresenter = new SectionPresenter(
      this.#cards,
      this.#comments,
      this.#boardCardsPresenters);
    mainSectionPresenter.init(container, mainCardsSectionView);

    const sortingPresenter = new SortingPresenter(
      this.#cards,
      mainSectionPresenter.initialOrderCards
    );
    sortingPresenter.init(
      mainCardsSectionView.element,
      () => {
        mainSectionPresenter.clearSection();
        mainSectionPresenter.renderList();
      }
    );

    new SectionPresenter(
      this.#cardsModel.getTopRated(2),
      this.#comments,
      this.#boardCardsPresenters)
      .init(container, topCardsSectionView);

    new SectionPresenter(
      this.#cardsModel.getMostCommented(2),
      this.#comments,
      this.#boardCardsPresenters)
      .init(container, popularCardsSectionView);
  }
}
