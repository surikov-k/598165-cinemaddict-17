import DetailsPresenter from './details-presenter';
import ExtraSectionPresenter from './extra-section-presenter';
import FilterModel from '../model/filter-model';
import FilterPresenter from './filter-presenter';
import MainSectionPresenter from './main-section-presenter';
import {UserAction} from '../const';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

const TOP_SECTION_TITLE = 'Top rated';
const POPULAR_SECTION_TITLE = 'Most commented';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export default class BoardPresenter {
  #cardsModel = null;
  #commentsModel = null;

  #mainSectionPresenter = null;
  #topSectionPresenter = null;
  #popularSectionPresenter = null;
  #detailsPresenter = null;

  #filterModel = null;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

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

  #handleViewAction = async (
    actionType, updateType,
    update,
    setViewFeedBack = () => {},
    setAborting = () => {}) => {
    this.#uiBlocker.block();
    setViewFeedBack();
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        try {
          await  this.#cardsModel.update(updateType, update);
        } catch (err) {
          setAborting();
        }
        break;
      case UserAction.ADD_COMMENT:
        try {
          await this.#commentsModel.add(updateType, update);
        } catch (err) {
          setAborting();
        }
        break;
      case UserAction.DELETE_COMMENT:
        try {
          await this.#commentsModel.delete(updateType, update);
        } catch (err) {
          setAborting();
        }
        break;
      case UserAction.OPEN_DETAILS:
        this.#detailsPresenter.open(update);
        break;
    }
    this.#uiBlocker.unblock();
  };
}
