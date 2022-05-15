import AbstractView from '../framework/view/abstract-view';
import {truncateText} from '../utils/text';
import {formatDate, formatDuration} from '../utils/datetime';

const createTemplate = (card) => {
  const {
    comments,
    filmInfo: {
      description,
      genre: [mainGenre],
      poster,
      release: {date},
      runtime,
      title,
      totalRating,
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite
    }
  } = card;

  const toggleFilmsControlButton = (toggle) => {
    if (toggle) {
      return 'film-card__controls-item--active';
    }
    return '';
  };

  return `
  <article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatDate(date, 'YYYY')}</span>
        <span class="film-card__duration">${formatDuration(runtime)}</span>
        <span class="film-card__genre">${mainGenre}</span>
      </p>
      <img src="${poster}" alt="Poster for ${title}" class="film-card__poster">
      <p class="film-card__description">${truncateText(description)}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item 
      film-card__controls-item--add-to-watchlist ${toggleFilmsControlButton(watchlist)}" 
      type="button">Add to watchlist</button>
      <button class="film-card__controls-item 
      film-card__controls-item--mark-as-watched ${toggleFilmsControlButton(alreadyWatched)}" 
      type="button">Mark as watched</button>
      <button class="film-card__controls-item 
      film-card__controls-item--favorite ${toggleFilmsControlButton(favorite)}" 
      type="button">Mark as favorite</button>
    </div>
  </article>
`;
};

export default class CardView extends AbstractView {
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createTemplate(this.#card);
  }

  setOpenDetailsHandler = (callback) => {
    this._callback.openDetails = callback;
    this.element.querySelector('.film-card__link')
      .addEventListener('click', this.#openDetailsHandler);
  };

  #openDetailsHandler = (evt) => {
    evt.preventDefault();
    this._callback.openDetails();
  };

  setToggleWatchlistHandler = (callback) => {
    this._callback.toggleWatchlist = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', () => {
        this._callback.toggleWatchlist();
      });
  };

  setToggleAlreadyWatchedHandler = (callback) => {
    this._callback.toggleWatched = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', () => {
        this._callback.toggleWatched();
      });
  };

  setToggleFavoritesHandler = (callback) => {
    this._callback.toggleFavorites = callback;
    this.element.querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', () => {
        this._callback.toggleFavorites();
      });
  };
}
