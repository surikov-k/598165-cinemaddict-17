import DetailsPresenter from './details-presenter';
import ExtraSectionPresenter from './extra-section-presenter';
import FilterModel from '../model/filter-model';
import FilterPresenter from './filter-presenter';
import MainSectionPresenter from './main-section-presenter';
import {UserAction} from '../const';

const TOP_SECTION_TITLE = 'Top rated';
const POPULAR_SECTION_TITLE = 'Most commented';

export default class BoardPresenter {
  #cardsModel = null;
  #commentsModel = null;

  #mainSectionPresenter = null;
  #topSectionPresenter = null;
  #popularSectionPresenter = null;
  #detailsPresenter = null;

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
      this.#cardsModel,
      this.#commentsModel,
      this.#handleViewAction,
      () => this.#cardsModel.topRatedCards
    );

    this.#popularSectionPresenter = new ExtraSectionPresenter(
      container,
      POPULAR_SECTION_TITLE,
      this.#cardsModel,
      this.#commentsModel,
      this.#handleViewAction,
      () => this.#cardsModel.popularCards
    );

    this.#detailsPresenter = new DetailsPresenter(
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
        this.#detailsPresenter.open(update);
        break;
    }
  };
}
