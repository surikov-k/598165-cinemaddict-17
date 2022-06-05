import FilterView from '../view/filter-view';
import {FilterType, UpdateType} from '../const';
import {filter} from '../utils/filter';
import {remove, render, RenderPosition, replace} from '../framework/render';

export default class FilterPresenter {
  #cardsModel = null;
  #container = null;
  #model = null;
  #view = null;

  constructor(container, model, cardsModel) {
    this.#container = container;
    this.#model = model;
    this.#cardsModel = cardsModel;

    this.#cardsModel.addObserver(this.#handleModelEvent);
    this.#model.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const cards = this.#cardsModel.cards;
    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](cards).length
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](cards).length
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](cards).length
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](cards).length
      },
    ];
  }

  init(){
    const filters = this.filters;
    const prevView = this.#view;

    this.#view = new FilterView(filters, this.#model.filter);
    this.#view.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevView === null) {
      render(this.#view, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#view, prevView);
    remove(prevView);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (type) => {
    if (this.#model.filter === type) {
      return;
    }
    this.#model.setFilter(UpdateType.MAJOR, type);
  };
}
