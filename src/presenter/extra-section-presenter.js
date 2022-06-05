import ExtraCardsSectionView from '../view/extra-cards-section-view';
import {remove, render} from '../framework/render';
import ListPresenter from './list-presenter';

export default class ExtraSectionPresenter {
  #cards = null;
  #cardsList = null;
  #container = null;
  #handleViewAction = null;
  #title = null;
  #view = null;

  constructor(container, title, handleViewAction) {
    this.#title = title;
    this.#handleViewAction = handleViewAction;
    this.#container = container;
  }

  init(cards) {
    if (!cards.length) {
      return;
    }

    this.#cards = cards;
    this.#view =  new ExtraCardsSectionView(this.#title);
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

  update(cards) {
    this.#clear();
    this.init(cards);
  }
}
