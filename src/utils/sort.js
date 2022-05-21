import {SortType} from '../const';
import dayjs from 'dayjs';

const sort = {
  [SortType.DEFAULT]: (cards, initialOrderCards) => {
    cards.length = 0;
    initialOrderCards.forEach((card) => cards.push(card));
  },
  [SortType.RATING]: (cards) => cards
    .sort((firstCard, secondCard) => secondCard.filmInfo.totalRating - firstCard.filmInfo.totalRating),
  [SortType.DATE]: (cards) => cards
    .sort((firstCard, secondCard) => dayjs(firstCard.filmInfo.release.date)
      .diff(dayjs(secondCard.filmInfo.release.date))),
};

export {sort};
