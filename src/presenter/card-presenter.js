import CardView from '../view/card-view';
import {remove, render, replace} from '../framework/render';
import {UpdateType, UserAction, UserDetail} from '../const';

export class CardPresenter {
  #card = null;
  #cardView = null;
  #container = null;
  #changeData = () => {};

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
    const prevCardView = this.#cardView;

    this.#cardView = new CardView(this.#card);

    this.#cardView.setOpenDetailsHandler(() => {
      this.#changeData(
        UserAction.OPEN_DETAILS,
        null,
        this.#card
      );
    });
    this.#cardView.setToggleWatchlistHandler(this.#handleAddToWatchlistClick);
    this.#cardView.setToggleAlreadyWatchedHandler(this.#handleMarkAsWatchedClick);
    this.#cardView.setToggleFavoritesHandler(this.#handleToggleFavoritesClick);

    if (prevCardView === null) {
      render(this.#cardView, this.#container);
      return;
    }

    replace(this.#cardView, prevCardView);
    remove(prevCardView);
  }

  destroy() {
    remove(this.#cardView);
  }

  #handleAddToWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card: {...this.#updateUserDetails(UserDetail.WATCHLIST)}}
    );
  };

  #handleMarkAsWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card: this.#updateUserDetails(UserDetail.ALREADY_WATCHED)}
    );
  };

  #handleToggleFavoritesClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      {card: this.#updateUserDetails(UserDetail.FAVORITE)}
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

