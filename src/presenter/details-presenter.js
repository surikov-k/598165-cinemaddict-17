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
    this.#cardsModel.addObserver(this.#handleModelEvent);
  }

  async open(card) {
    this.#card = card;
    const preView = this.#view;
    this.#comments = await this.#commentsModel.get(this.#card);
    this.#view = new DetailsView(this.#card, this.#comments);

    this.#view.lockScroll();
    this.#view.setCloseHandler(this.#close);

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

  #close = () => {
    this.#view.unlockScroll();
    window.removeEventListener('keydown', this.#onEscKeydown);
    remove(this.#view);
    this.#view = null;
  };

  #setUpdating = () => {
    this.#view.updateElement({
      isUpdating: true,
      isDisabled: true,
    });

  };

  #setSaving = () => {
    this.#view.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  #setDeleting = () => {
    this.#view.updateElement({
      isDisabled: true,
      isDeleting: true,
    });
  };

  #resetView = () => {
    this.#view.updateElement({
      isDisabled: false,
      isSaving: false,
      isUpdating: false,
      commentToDelete: null
    });
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' && !this.#view.isInputActive()) {
      evt.preventDefault();
      this.#view.unlockScroll();
      this.#close();
    }
  };

  #shakeControls = (callback) => () => {
    this.#view.shake
      .call({
        element: this.#view.getControlsElement()
      }, callback);
  };

  #handleAddToWatchlistClick = (card) => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card},
      this.#setUpdating,
      this.#shakeControls(this.#resetView)
    );
  };

  #handleMarkAsWatchedClick = (card) => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card},
      this.#setUpdating,
      this.#shakeControls(this.#resetView)
    );
  };

  #handleToggleFavoritesClick = (card) => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card},
      this.#setUpdating,
      this.#shakeControls(this.#resetView)
    );
  };

  #handleAddComment = (data) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      data,
      this.#setSaving,
      () => {
        this.#view.shake(this.#resetView);
      }
    );
  };

  #shakeComment = (commentId, callback) => () => {
    this.#view.shake
      .call({
        element: this.#view.getCommentElement(commentId)
      }, callback);
  };

  #handleDeleteComment = (data) => {
    const {commentId} = data;

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      data,
      this.#setDeleting,
      this.#shakeComment(commentId, this.#resetView)
    );
  };

  #handleModelEvent = async (updateType, data) => {
    const {actionType} = data;

    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this.#view?.updateElement({
          card: data.card,
          isUpdating: false,
          isDisabled: false,
        });
        break;
      case UserAction.ADD_COMMENT:
        this.#view?.updateElement({
          comments: [...data.comments],
          newComment: {
            emoji: null,
            text: null,
          },
          isDisabled: false,
          isSaving: false,
        });
        break;
      case UserAction.DELETE_COMMENT:
        this.#comments = await this.#commentsModel.get(this.#card);
        this.#view?.updateElement({
          comments: this.#comments,
          newComment: {
            emoji: null,
            text: null,
          }
        });
        break;
    }
  };
}

