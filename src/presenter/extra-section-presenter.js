import ExtraCardsSectionView from '../view/extra-cards-section-view';
import ListPresenter from './list-presenter';
import {UpdateType} from '../const';
import {remove, render} from '../framework/render';

export default class ExtraSectionPresenter {
  #cardsModel = null;
  #commentsModel = null;
  #cards = [];
  #cardsList = null;
  #container = null;
  #handleViewAction = null;
  #getCards = () => {throw new Error('getCards is undefined');};
  #title = null;
  #view = null;

  constructor(container, title, cardsModel, commentsModel, handleViewAction, getCards) {
    this.#container = container;
    this.#title = title;
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
    this.#handleViewAction = handleViewAction;
    this.#getCards = getCards;

    this.#cardsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#cards = this.#getCards();

    if (!this.#cards.length) {
      return;
    }

    this.#view = new ExtraCardsSectionView(this.#title);
    render(this.#view, this.#container);

    this.#cardsList = new ListPresenter(
      this.#view,
      this.#handleViewAction
    );
    this.#render();
  }

  #render() {
    this.#cardsList.render(this.#cards);
  }

  #clear() {
    remove(this?.#view);
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.PATCH:
      case UpdateType.MINOR:
        this.#clear();
        this.init();
        break;
      case UpdateType.INIT:
        this.init();
        break;
    }
  };
}
