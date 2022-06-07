import DetailsView from '../view/details-view';
import {remove, render, replace} from '../framework/render';
import {UpdateType, UserAction} from '../const';

export default class DetailsPresenter {
  #card = null;
  #comments = null;
  #cardsModel = null;
  #commentsModel = null;
  #view = null;
  #container = document.body;
  #changeData = () => {throw new Error('Change data function wasn\'t defined');};

  constructor(cardsModel, commentsModel, changeData) {
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;

    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  async open(card) {
    this.#card = card;
    const preView = this.#view;
    this.#comments = await this.#commentsModel.get(this.#card);
    this.#view = new DetailsView(this.#card, this.#comments);

    this.#view.lockScroll();
    this.#view.setCloseHandler(this.close);

    this.#view.setToggleWatchlistHandler(this.#handleAddToWatchlistClick);
    this.#view.setToggleAlreadyWatchedHandler(this.#handleMarkAsWatchedClick);
    this.#view.setToggleFavoritesHandler(this.#handleToggleFavoritesClick);

    this.#view.setAddCommentHandler(this.#handleAddComment);
    this.#view.setDeleteCommentHandler(this.#handleDeleteComment);

    window.addEventListener('keydown', this.#onEscKeydown);

    if (preView === null) {
      render(this.#view, this.#container);
      return;
    }

    if (this.#container.contains(preView.element)) {
      replace(this.#view, preView);
    }

    remove(preView);
  }

  close = () => {
    this.#view.unlockScroll();
    window.removeEventListener('keydown', this.#onEscKeydown);
    remove(this.#view);
    this.#view = null;
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' && !this.#view.isInputActive()) {
      evt.preventDefault();
      this.#view.unlockScroll();
      this.close();
    }
  };

  #handleAddToWatchlistClick = (card) => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card}
    );
  };

  #handleMarkAsWatchedClick = (card) => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card}
    );
  };

  #handleToggleFavoritesClick = (card) => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card}
    );
  };

  #handleAddComment = (data) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      data
    );
  };

  #handleDeleteComment = (data) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      data
    );
  };

  #handleModelEvent = (updateType, data) => {
    this.#view.update(data);
  };
}

