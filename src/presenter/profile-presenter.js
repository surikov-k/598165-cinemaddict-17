import ProfileView from '../view/profile-view';
import {UserStatus} from '../const';
import {remove, render, replace} from '../framework/render';

export default class ProfilePresenter {
  #cardsModel = null;
  #container = null;
  #view = null;

  constructor(container, cardsModel) {
    this.#container = container;
    this.#cardsModel = cardsModel;

    this.#cardsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevView = this.#view;
    const watchedCount = this.#cardsModel.watchedCount;

    if (!watchedCount) {
      remove(this.#view);
      this.#view = null;
      return;
    }

    this.#view = new ProfileView(this.#getStatus());

    if (prevView === null) {
      render(this.#view, this.#container);
      return;
    }

    replace(this.#view, prevView);
    remove(prevView);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #getStatus() {
    const watchedCount = this.#cardsModel.watchedCount;
    if (watchedCount >= 1 && watchedCount <= 10) {
      return UserStatus.NOVICE;
    }
    if (watchedCount >= 11 && watchedCount <= 20) {
      return UserStatus.FAN;
    }
    if (watchedCount >= 21) {
      return UserStatus.MOVIE_BUFF;
    }
  }
}
