import CardView from '../view/card-view';
import DetailsView from '../view/details-view';
import {remove, render, replace} from '../framework/render';

export class CardPresenter {
  #card = null;
  #cardView = null;
  #comments = null;
  #container = null;
  #detailsView = null;
  #isDetailsViewOpened = false;
  #allComments = null;
  #boardState = null;

  #changeData = () => {};
  #addComment = () => {};

  constructor(
    container,
    card,
    allComments,
    changeData,
    addComment,
    boardState
  ) {
    this.#container = container;
    this.#card = card;
    this.#allComments = allComments;
    this.#changeData = changeData;
    this.#addComment = addComment;
    this.#boardState = boardState;
  }

  get id() {
    return this.#card.id;
  }

  add(card) {
    this.#card = card;
    this.#comments = this.#getCardComments(this.#allComments, this.#card);
    const prevCardView = this.#cardView;
    const prevDetailsView = this.#detailsView;

    this.#cardView = new CardView(this.#card);
    if (!this.#isDetailsViewOpened) {
      this.#detailsView = new DetailsView(this.#card, this.#comments);
    }

    this.#cardView.setOpenDetailsHandler(() => {
      this.#openDetails();
    });
    this.#cardView.setToggleWatchlistHandler(this.#handleAddToWatchlistClick);
    this.#cardView.setToggleAlreadyWatchedHandler(this.#handleMarkAsWatchedClick);
    this.#cardView.setToggleFavoritesHandler(this.#handleAddToFavoritesClick);

    if (prevCardView === null || prevDetailsView === null) {
      render(this.#cardView, this.#container);
      return;
    }

    if (this.#container.contains(prevCardView.element)) {
      replace(this.#cardView, prevCardView);
    }
    if (this.#isDetailsViewOpened) {
      this.#detailsView.rerender(this.#card, this.#comments);
    }
    remove(prevCardView);
  }

  destroy() {
    if (this.#isDetailsViewOpened ) {
      this.closeDetails();
    }
    remove(this.#cardView);
    remove(this.#detailsView);
  }

  closeDetails = () => {
    this.#isDetailsViewOpened = false;
    this.#detailsView.unlockScroll();
    window.removeEventListener('keydown', this.#onEscKeydown);
    remove(this.#detailsView);
  };


  #openDetails() {
    if  (this.#boardState.openedCard) {
      this.#boardState.openedCard.closeDetails();
    }

    this.#isDetailsViewOpened = true;
    this.#boardState.openedCard = this;

    this.#detailsView.lockScroll();
    this.#detailsView.setCloseHandler(this.closeDetails);

    this.#detailsView.setToggleWatchlistHandler(this.#handleAddToWatchlistClick);
    this.#detailsView.setToggleAlreadyWatchedHandler(this.#handleMarkAsWatchedClick);
    this.#detailsView.setToggleFavoritesHandler(this.#handleAddToFavoritesClick);

    this.#detailsView.setAddCommentHandler(this.#handleSubmitComment);

    window.addEventListener('keydown', this.#onEscKeydown);

    render(this.#detailsView, document.body);
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' && !this.#detailsView.isInputActive()) {
      evt.preventDefault();
      this.#isDetailsViewOpened = false;
      this.#detailsView.unlockScroll();
      this.closeDetails();
    }
  };

  #handleAddToWatchlistClick = () => {
    this.#changeData({
      ...this.#card,
      userDetails: {
        ...this.#card.userDetails,
        watchlist: !this.#card.userDetails.watchlist
      }
    });
  };

  #handleMarkAsWatchedClick = () => {
    this.#changeData({
      ...this.#card,
      userDetails: {
        ...this.#card.userDetails,
        alreadyWatched: !this.#card.userDetails.alreadyWatched
      }
    });
  };

  #handleAddToFavoritesClick = () => {
    this.#changeData({
      ...this.#card,
      userDetails: {
        ...this.#card.userDetails,
        favorite: !this.#card.userDetails.favorite
      }
    });
  };

  #handleSubmitComment = (comment) => {
    const commentId = this.#addComment(comment);
    this.#changeData({
      ...this.#card,
      comments: [...this.#card.comments, commentId]
    });
  };

  #getCardComments(allComments, card) {
    const comments = [];
    card.comments.forEach((commentId) => {
      comments.push(allComments.find((comment) => comment.id === commentId));
    });
    return comments;
  }
}

