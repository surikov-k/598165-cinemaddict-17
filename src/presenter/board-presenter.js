import DetailsPresenter from './details-presenter';
import ExtraSectionPresenter from './extra-section-presenter';
import FilterModel from '../model/filter-model';
import FilterPresenter from './filter-presenter';
import MainSectionPresenter from './main-section-presenter';
import {UpdateType, UserAction} from '../const';

const TOP_SECTION_TITLE = 'Top rated';
const POPULAR_SECTION_TITLE = 'Most commented';

export default class BoardPresenter {
  #cardsModel = null;
  #commentsModel = null;

  #mainSectionPresenter = null;
  #topSectionPresenter = null;
  #popularSectionPresenter = null;

  #filterModel = null;

  constructor(cardsModel, commentsModel) {
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  init(container) {
    this.#filterModel = new FilterModel();
    const filterPresenter = new FilterPresenter(
      document.querySelector('.main'),
      this.#filterModel,
      this.#cardsModel);
    filterPresenter.init();

    this.#cardsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#mainSectionPresenter = new MainSectionPresenter(
      this.#cardsModel,
      this.#commentsModel,
      this.#filterModel,
      this.#handleViewAction
    );
    this.#mainSectionPresenter.init(container);

    this.#topSectionPresenter = new ExtraSectionPresenter(
      container,
      TOP_SECTION_TITLE,
      this.#handleViewAction);
    this.#topSectionPresenter
      .init(this.#cardsModel.topRatedCards);

    this.#popularSectionPresenter = new ExtraSectionPresenter(
      container,
      POPULAR_SECTION_TITLE,
      this.#handleViewAction
    );
    this.#popularSectionPresenter
      .init(this.#cardsModel.popularCards);

    this.details = new DetailsPresenter(
      this.#cardsModel,
      this.#commentsModel,
      this.#handleViewAction
    );
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this.#cardsModel.update(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.add(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.delete(updateType, update);
        break;
      case UserAction.OPEN_DETAILS:
        this.details.open(update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    const {card} = data;
    switch (updateType) {
      case UpdateType.PATCH:
        this.#mainSectionPresenter.addCard(card);
        this.#topSectionPresenter
          .update(this.#cardsModel.topRatedCards);
        this.#popularSectionPresenter
          .update(this.#cardsModel.popularCards);

        break;
      case UpdateType.MINOR:
        this.#mainSectionPresenter.clear();
        this.#mainSectionPresenter.render();

        this.#topSectionPresenter
          .update(this.#cardsModel.topRatedCards);
        this.#popularSectionPresenter
          .update(this.#cardsModel.popularCards);

        break;
      case UpdateType.MAJOR:
        this.#mainSectionPresenter.clear({
          resetRenderedCardsCount: true,
          resetSortType: true
        });
        this.#mainSectionPresenter.render();
        break;
    }
  };
}
