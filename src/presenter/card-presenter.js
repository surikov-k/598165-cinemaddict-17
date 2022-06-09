import CardView from '../view/card-view';
import {remove, render, replace} from '../framework/render';
import {UpdateType, UserAction, UserDetail} from '../const';

export class CardPresenter {
  #card = null;
  #view = null;
  #container = null;
  #changeData = () => {throw new Error('Change data function wasn\'t defined');};

  constructor(
    container,
    changeData,
  ) {
    this.#container = container;
    this.#changeData = changeData;
  }

  get id() {
    return this.#card.id;
  }

  add(card) {
    this.#card = card;
    const prevCardView = this.#view;

    this.#view = new CardView(this.#card);

    this.#view.setOpenDetailsHandler(() => {
      this.#changeData(
        UserAction.OPEN_DETAILS,
        null,
        this.#card
      );
    });
    this.#view.setToggleWatchlistHandler(this.#handleAddToWatchlistClick);
    this.#view.setToggleAlreadyWatchedHandler(this.#handleMarkAsWatchedClick);
    this.#view.setToggleFavoritesHandler(this.#handleToggleFavoritesClick);

    if (prevCardView === null) {
      render(this.#view, this.#container);
      return;
    }

    replace(this.#view, prevCardView);
    remove(prevCardView);
  }

  destroy() {
    remove(this.#view);
  }

  #setAborting = () => {
    this.#view.shake();
  };

  #handleAddToWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card: this.#updateUserDetails(UserDetail.WATCHLIST)},
      () => {},
      this.#setAborting
    );
  };

  #handleMarkAsWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card: this.#updateUserDetails(UserDetail.ALREADY_WATCHED)},
      () => {},
      this.#setAborting
    );
  };

  #handleToggleFavoritesClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card: this.#updateUserDetails(UserDetail.FAVORITE)},
      () => {},
      this.#setAborting
    );
  };

  #updateUserDetails = (detail) => ({
    ...this.#card,
    userDetails: {
      ...this.#card.userDetails,
      [detail]: !this.#card.userDetails[detail]
    }
  });
}

