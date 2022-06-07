import ListPresenter from './list-presenter';
import MainCardsSectionView from '../view/main-cards-section-view';
import MoreButtonView from '../view/more-button-view';
import NoCardsView from '../view/no-cards-view';
import SortView from '../view/sort-view';
import {CARDS_PER_CLICK, SortType, UpdateType} from '../const';
import {filter} from '../utils/filter';
import {remove, render, RenderPosition} from '../framework/render';
import {sortByDate, sortByRating} from '../utils/sort';

export default class MainSectionPresenter {
  #cardsModel = null;
  #commentsModel = null;
  #container = null;
  #currentSortType = SortType.DEFAULT;
  #filterModel = null;
  #handleViewAction;
  #listContainer = null;
  #moreButtonView = null;
  #noCardsView = null;
  #renderedCardsCount = CARDS_PER_CLICK;
  #sortView = null;
  #view = null;

  constructor(cardsModel, commentsModel, filterModel, handleViewAction) {
    this.#view = new MainCardsSectionView();
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#handleViewAction = handleViewAction;

    this.#cardsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init(container) {
    this.#container = container;
    render(this.#view, this.#container, RenderPosition.AFTERBEGIN);
    this.cardsList = new ListPresenter(
      this.#view,
      this.#handleViewAction
    );
    this.render();
  }

  get cards() {
    const filterType = this.#filterModel.filter;
    const cards = this.#cardsModel.cards;
    const filteredCards = filter[filterType](cards);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredCards.sort(sortByDate);
      case SortType.RATING:
        return filteredCards.sort(sortByRating);

    }
    return filteredCards;
  }

  addCard(card) {
    this.cardsList.addCard(card);
  }

  clear({
    resetRenderedCardsCount = false,
    resetSortType = false,
  } = {}) {

    this.cardsList.clear();

    remove(this.#noCardsView);
    remove(this.#sortView);
    remove(this.#moreButtonView);

    if (resetRenderedCardsCount) {
      this.#renderedCardsCount = CARDS_PER_CLICK;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  render() {
    this.#listContainer = this.#view.element
      .querySelector('.films-list__container');
    const cards = this.cards;
    const cardsCount = cards.length;

    if (!cardsCount) {
      this.#renderNoCards();
      return;
    }
    remove(this.#noCardsView);
    this.#renderSort();

    this.cardsList.render(cards
      .slice(0, Math.min(cards.length, this.#renderedCardsCount)));

    if (cardsCount > this.#renderedCardsCount) {
      this.#renderLoadMoreButton();
    }
  }

  #renderLoadMoreButton() {
    this.#moreButtonView = new MoreButtonView();
    this.#moreButtonView.setClickHandler(this.#handleLoadMoreButtonClick);

    render(this.#moreButtonView, this.#listContainer, RenderPosition.AFTEREND);
  }

  #renderSort() {
    this.#sortView = new SortView(this.#currentSortType);
    render(this.#sortView, this.#container, RenderPosition.BEFOREBEGIN);

    this.#sortView.setChangeTypeHandler(this.#handelSortTypeChange);
  }

  #handleLoadMoreButtonClick = () => {
    const nextSlice = Math.min(this.cards.length, this.#renderedCardsCount + CARDS_PER_CLICK);
    const cards = this.cards.slice(this.#renderedCardsCount, nextSlice);

    this.cardsList.render(cards);
    this.#renderedCardsCount = nextSlice;

    if (this.#renderedCardsCount >= this.cards.length) {
      remove(this.#moreButtonView);
    }
  };

  #handelSortTypeChange = (type) => {
    if (this.#currentSortType === type) {
      return;
    }
    this.#currentSortType = type;
    this.clear({resetRenderedCardsCount: true});
    this.render();
  };

  #renderNoCards() {
    this.#noCardsView = new NoCardsView(this.#filterModel.filter);
    render(this.#noCardsView, this.#view.element);
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.addCard(data.card);
        break;
      case UpdateType.MINOR:
        this.clear();
        this.render();
        break;
      case UpdateType.MAJOR:
        this.clear({
          resetRenderedCardsCount: true,
          resetSortType: true
        });
        this.render();
        break;
      case UpdateType.INIT:
        this.render();
        break;
    }
  };
}
