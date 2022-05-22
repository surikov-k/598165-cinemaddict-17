import ExtraCardsSectionView from '../view/extra-cards-section-view';
import MainCardsSectionView from '../view/main-cards-section-view';
import SectionPresenter from './section-presenter';
import SortingPresenter from './sorting-presenter';
import {updateItem} from '../utils/common';

export default class BoardPresenter {
  #cardsModel = null;
  #commentsModel = null;
  #comments = null;
  #cards = null;
  #initialOrderCards = null;
  #boardCardsPresenters = [];

  constructor(cardsModel, commentsModel) {
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  init(container) {
    this.#cards = [...this.#cardsModel.cards];
    this.#initialOrderCards = [...this.#cards];
    this.#comments = [...this.#commentsModel.comments];

    const mainCardsSectionView = new MainCardsSectionView(this.#cards.length);
    const topCardsSectionView = new ExtraCardsSectionView('Top rated');
    const popularCardsSectionView = new ExtraCardsSectionView('Most commented');

    const mainSectionPresenter = new SectionPresenter(
      this.#cards,
      this.#comments,
      this.#boardCardsPresenters,
      this.#handleCardChange);
    mainSectionPresenter.init(container, mainCardsSectionView);

    const sortingPresenter = new SortingPresenter(
      this.#cards,
      mainSectionPresenter.initialOrderCards
    );
    sortingPresenter.init(
      mainCardsSectionView.element,
      (tasks) => {
        mainSectionPresenter.clearSection();
        mainSectionPresenter.updateCards(tasks);
        mainSectionPresenter.renderList();
      }
    );

    new SectionPresenter(
      this.#cardsModel.getTopRated(2),
      this.#comments,
      this.#boardCardsPresenters,
      this.#handleCardChange)
      .init(container, topCardsSectionView);

    new SectionPresenter(
      this.#cardsModel.getMostCommented(2),
      this.#comments,
      this.#boardCardsPresenters,
      this.#handleCardChange)
      .init(container, popularCardsSectionView);
  }

  #handleCardChange = (updatedCard) => {
    this.#cards = updateItem(this.#cards, updatedCard);
    this.#initialOrderCards = updateItem(this.#cards, updatedCard);

    this.#boardCardsPresenters.forEach((cardPresenter) => {
      if (cardPresenter.id === updatedCard.id) {
        cardPresenter.add(updatedCard);
      }
    });
  };

}
