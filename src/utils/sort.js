import {SortType} from '../const';
import dayjs from 'dayjs';

const sort = {
  [SortType.DEFAULT]: (cards, initialOrderCards) => [...initialOrderCards],
  [SortType.RATING]: (cards) => {
    const sorted = [...cards];
    return sorted
      .sort((firstCard, secondCard) => secondCard.filmInfo.totalRating - firstCard.filmInfo.totalRating);
  },
  [SortType.DATE]: (cards) => {
    const sorted = [...cards];
    return sorted
      .sort((firstCard, secondCard) => dayjs(firstCard.filmInfo.release.date)
        .diff(dayjs(secondCard.filmInfo.release.date)));
  },
};

export {sort};
