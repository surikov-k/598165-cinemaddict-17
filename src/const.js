const CARDS_PER_CLICK = 5;

const Emoji = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};


const FilterType = {
  ALL: 'allmovies',
  WATCHLIST: 'alreadyWatched',
  HISTORY: 'history',
  FAVORITES: 'favorite',
};

const Method = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const UserAction = {
  UPDATE_CARD: 'UPDATE_CARD',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  OPEN_DETAILS: 'OPEN_DETAILS',
};

const UserDetail = {
  WATCHLIST: 'watchlist',
  ALREADY_WATCHED: 'alreadyWatched',
  FAVORITE: 'favorite',
};

const UserStatus = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

export {
  CARDS_PER_CLICK,
  FilterType,
  Emoji,
  Method,
  SortType,
  UpdateType,
  UserAction,
  UserDetail,
  UserStatus,
};
