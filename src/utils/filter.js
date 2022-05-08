import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (cards) => cards,
  [FilterType.WATCHLIST ]: (cards) => cards.filter((card) => card.userDetails.watchlist),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.userDetails.favorite),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.userDetails.alreadyWatched),
};

export {filter};

