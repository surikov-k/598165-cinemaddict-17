import ExtraCardsSectionView from '../view/extra-cards-section-view';
import MainCardsSectionView from '../view/main-cards-section-view';
import SectionPresenter from './section-presenter';
import SortingPresenter from './sorting-presenter';
import {getRandomElementFrom, updateItem} from '../utils/common';

import {FIRST_NAMES, LAST_NAMES} from '../mock/comment-data';
import {id} from '../mock/comment';

const user = `${getRandomElementFrom(FIRST_NAMES)} ${getRandomElementFrom(LAST_NAMES)}`;

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
      this.#handleCardChange,
      this.#handleAddComment);
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
      this.#handleCardChange,
      this.#handleAddComment)
      .init(container, topCardsSectionView);

    new SectionPresenter(
      this.#cardsModel.getMostCommented(2),
      this.#comments,
      this.#boardCardsPresenters,
      this.#handleCardChange,
      this.#handleAddComment)
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

  #handleAddComment = (newComment) => {
    const newCommentId = id.next().value.toString();

    this.#comments.push({
      ...newComment,
      id: newCommentId,
      author: user,
      date: new Date(),
    });

    return newCommentId;
  };
}
