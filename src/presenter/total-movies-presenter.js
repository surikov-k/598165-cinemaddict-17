import TotalMoviesView from '../view/total-movies-view';
import {UpdateType} from '../const';
import {render} from '../framework/render';

export default class TotalMoviesPresenter {
  #view = null;
  #cardsModel = null;
  #container = null;
  #total = null;

  constructor(container, cardsModel) {
    this.#container = container;
    this.#cardsModel = cardsModel;
    this.#cardsModel.addObserver(this.#handelModelEvent);
  }

  init() {
    this.#view = new TotalMoviesView(this.#total);
    render(this.#view, this.#container);
  }

  #handelModelEvent = (updateType, data) => {
    if (updateType === UpdateType.INIT) {
      this.#total = data.length;
      this.init();
    }
  };
}
