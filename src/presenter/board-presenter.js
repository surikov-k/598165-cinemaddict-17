import ExtraCardsSectionView from '../view/extra-cards-section-view';
import MainCardsSectionView from '../view/main-cards-section-view';
import SectionPresenter from './section-presenter';
import SortView from '../view/sort-view';

import {FIRST_NAMES, LAST_NAMES} from '../mock/comment-data';
import {getRandomElementFrom, updateItem} from '../utils/common';
import {id} from '../mock/comment';
import {render, RenderPosition} from '../framework/render';

const user = `${getRandomElementFrom(FIRST_NAMES)} ${getRandomElementFrom(LAST_NAMES)}`;

export default class BoardPresenter {
  #cardsModel = null;
  #commentsModel = null;
  #comments = null;
  #cards = null;
  #initialOrderCards = null;
  #mainSectionPresenter = null;
  #topSectionPresenter = null;
  #popularSectionPresenter = null;
  #state = {openedCard: null};

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

    this.#mainSectionPresenter = new SectionPresenter(
      this.#cards,
      this.#comments,
      this.#handleCardChange,
      this.#handleAddComment,
      this.#state);
    this.#mainSectionPresenter.init(container, mainCardsSectionView);

    const sortView = new SortView();
    render(sortView, mainCardsSectionView.element, RenderPosition.AFTERBEGIN);

    sortView.setChangeTypeHandler((type) => {
      this.#mainSectionPresenter.sort(type);
    });

    this.#topSectionPresenter = new SectionPresenter(
      this.#cardsModel.getTopRated(2),
      this.#comments,
      this.#handleCardChange,
      this.#handleAddComment,
      this.#state);
    this.#topSectionPresenter.init(container, topCardsSectionView);

    this.#popularSectionPresenter = new SectionPresenter(
      this.#cardsModel.getMostCommented(2),
      this.#comments,
      this.#handleCardChange,
      this.#handleAddComment,
      this.#state);
    this.#popularSectionPresenter.init(container, popularCardsSectionView);
  }

  #handleCardChange = (updatedCard) => {
    this.#cards = updateItem(this.#cards, updatedCard);
    this.#initialOrderCards = updateItem(this.#cards, updatedCard);

    [this.#mainSectionPresenter,
      this.#topSectionPresenter,
      this.#popularSectionPresenter,]
      .forEach((presenter) => presenter.updateCard(updatedCard));
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
