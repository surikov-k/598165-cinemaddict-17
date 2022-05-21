import SortView from '../view/sort-view';
import {render, RenderPosition} from '../framework/render';
import {sort} from '../utils/sort';

export default class SortingPresenter {
  #cards;
  #initialOrderCards;

  constructor(cards, initialOrderCards) {
    this.#cards = cards;
    this.#initialOrderCards = initialOrderCards;
  }

  init(container, updateListCallback) {
    const sortView = new SortView();
    render(sortView, container, RenderPosition.AFTERBEGIN);

    sortView.setChangeTypeHandler((type) => {
      sort[type](this.#cards, this.#initialOrderCards);
      updateListCallback();
    });
  }
}
