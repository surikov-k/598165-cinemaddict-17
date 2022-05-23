import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {formatDate, formatDuration, humanizeDate} from '../utils/datetime';

const Emoji = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};

const createTemplate = (state) => {
  const {card, comments} = state;

  const {
    filmInfo: {
      actors,
      alternativeTitle,
      description,
      ageRating,
      genre: genres,
      poster,
      release: {date, releaseCountry},
      director,
      writers,
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

  const {emoji: selectedEmoji} = state.newComment;

  const getGenresList = (genresList) => genresList
    .map((genre) => `<span class="film-details__genre">${genre}</span>`)
    .join('\n');

  const toggleUserDetailsButton = (toggle) => {
    if (toggle) {
      return 'film-details__control-button--active';
    }
    return '';
  };

  const getEmojiList = () => (`
    <div class="film-details__emoji-list">
      ${Object.values(Emoji).map((emoji) => `
        <input 
          class="film-details__emoji-item visually-hidden" 
          name="comment-emoji" 
          type="radio" 
          id="emoji-${emoji}" 
          value="${emoji}"
          ${emoji === selectedEmoji ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>
      `).join('\n')}
  </div>`);

  const createComment = (comment) => {
    const {
      author,
      comment: text,
      date: commentDate,
      emotion,
    } = comment;

    return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeDate(commentDate)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
    `;
  };

  return `
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="Poster for src="${poster}">
  
            <p class="film-details__age">${ageRating}+</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>
  
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatDate(date, 'D MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatDuration(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
                <td class="film-details__cell">
                  ${getGenresList(genres)}
                  </td>
              </tr>
            </table>
  
            <p class="film-details__film-description">${description}</p>
          </div>
        </div>
  
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${toggleUserDetailsButton(watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${toggleUserDetailsButton(alreadyWatched)}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${toggleUserDetailsButton(favorite)}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
  
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments 
          <span class="film-details__comments-count">${comments.length}</span>
          </h3>
  
          <ul class="film-details__comments-list">
            ${comments.map(createComment).join('\n')}
          </ul>
  
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
            ${selectedEmoji
    ? `<img src="./images/emoji/${selectedEmoji}.png" alt="emoji-${selectedEmoji}" width="55" height="55">`
    : ''}
            </div>
  
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${state.newComment.text ? state.newComment.text : ''}</textarea>
            </label>
            ${getEmojiList()}
        </section>
      </div>
    </form>
  </section>
`;
};

export default class DetailsView extends AbstractStatefulView {

  constructor(card, comments) {
    super();

    this._state = {
      card: {...card},
      comments: [...comments],
      newComment: {
        emoji: null,
        text: null,
      },
      scroll: null,
    };
    this.#setInnerHandlers();
  }

  get template() {
    return createTemplate(this._state);
  }

  setCloseHandler = (callback) => {
    this._callback.close = callback;

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeHandler);
  };

  setAddCommentHandler = (callback) => {
    this._callback.addComment = callback;
  };

  #addCommentHandler = () => {
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter' && evt.metaKey) {
          this._callback.addComment({
            comment: this._state.newComment.text,
            emotion: this._state.newComment.emoji,
          });
          this.updateElement(
            {
              ...this._state,
              newComment: {
                emoji: null,
                text: null,
              }
            }
          );
        }
      });
  };

  #closeHandler = (evt) => {
    evt.preventDefault();
    this.unlockScroll();
    this._callback.close();
  };

  rerender(card, comments) {
    this.updateElement({
      ...this._state,
      card: {...card},
      comments: [...comments],
    });
  }

  lockScroll = () => {
    document.body.classList.add('hide-overflow');
  };

  unlockScroll = () => {
    document.body.classList.remove('hide-overflow');
  };

  isInputActive = () => document.activeElement === this.element
    .querySelector('.film-details__comment-input');

  setToggleWatchlistHandler = (callback) => {
    this._callback.toggleWatchlist = callback;
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', () => {
        this._callback.toggleWatchlist();
      });
  };

  setToggleAlreadyWatchedHandler = (callback) => {
    this._callback.toggleWatched = callback;
    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', () => {
        this._callback.toggleWatched();
      });
  };

  setToggleFavoritesHandler = (callback) => {
    this._callback.toggleFavorites = callback;
    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', () => {
        this._callback.toggleFavorites();
      });
  };

  #setChooseEmoji() {
    const emojiList = this.element
      .querySelector('.film-details__emoji-list');

    emojiList.addEventListener('change', (evt) => {
      this.updateElement({
        ...this._state,
        newComment: {
          ...this._state.newComment,
          emoji: evt.target.value
        }
      });
    });
  }

  #setChangeCommentText() {
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('input', (evt) => {
        this._setState({newComment: {
          ...this._state.newComment,
          text: evt.target.value
        }});
      });
  }

  #saveScrollPositionHandler = (evt) => {
    this._setState({scroll: evt.target.scrollTop});
  };

  #setSaveScrollPosition() {
    this.element.addEventListener('scroll', this.#saveScrollPositionHandler);
  }

  #setInnerHandlers() {
    this.#setChooseEmoji();
    this.#setChangeCommentText();
    this.#setSaveScrollPosition();
    this.#addCommentHandler();
  }

  _restoreHandlers = () => {
    this.element.scrollTop = this._state.scroll;
    this.#setInnerHandlers();

    this.setCloseHandler(this._callback.close);
    this.setToggleWatchlistHandler(this._callback.toggleWatchlist);
    this.setToggleAlreadyWatchedHandler(this._callback.toggleWatched);
    this.setToggleFavoritesHandler(this._callback.toggleFavorites);
  };
}
