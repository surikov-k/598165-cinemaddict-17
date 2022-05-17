import CardView from '../view/card-view';
import DetailsView from '../view/details-view';
import {remove, render, replace} from '../framework/render';

export class CardPresenter {
  #card = null;
  #cardView = null;
  #comments = null;
  #container = null;
  #detailsView = null;
  #detailsViewOpened = false;
  #closeOpenedDetails = () => {};
  #changeData = () => {};

  constructor(
    container,
    changeData,
    closeOpenedDetails
  ) {
    this.#container = container;
    this.#closeOpenedDetails = closeOpenedDetails;
    this.#changeData = changeData;
  }

  get id() {
    return this.#card.id;
  }

  add(card, comments) {
    this.#card = card;
    this.#comments = comments;
    const prevCardView = this.#cardView;
    const prevDetailsView = this.#detailsView;

    this.#cardView = new CardView(this.#card);
    this.#detailsView = new DetailsView(this.#card, this.#comments);

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

    if (this.#container.contains(prevDetailsView.element)) {
      replace(this.#detailsView, prevDetailsView);
    }

    remove(prevCardView);
    remove(prevDetailsView);

    if (this.#detailsViewOpened) {
      this.#openDetails();
    }
  }

  destroy() {
    remove(this.#cardView);
    remove(this.#detailsView);
  }

  closeDetails = () => {
    this.#detailsViewOpened = false;
    this.#detailsView.unlockScroll();
    window.removeEventListener('keydown', this.#onEscKeydown);
    remove(this.#detailsView);
  };

  hasDetailsViewOpened = () => this.#detailsViewOpened;

  #openDetails() {
    this.#closeOpenedDetails();

    this.#detailsViewOpened = true;
    this.#detailsView = new DetailsView(this.#card, this.#comments);
    this.#detailsView.lockScroll();
    this.#detailsView.setCloseHandler(this.closeDetails);

    this.#detailsView.setToggleWatchlistHandler(this.#handleAddToWatchlistClick);
    this.#detailsView.setToggleAlreadyWatchedHandler(this.#handleMarkAsWatchedClick);
    this.#detailsView.setToggleFavoritesHandler(this.#handleAddToFavoritesClick);

    window.addEventListener('keydown', this.#onEscKeydown);

    render(this.#detailsView, document.body);
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' && !this.#detailsView.isInputActive()) {
      evt.preventDefault();
      this.#detailsViewOpened = false;
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
}

