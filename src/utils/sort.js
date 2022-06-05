import dayjs from 'dayjs';

const sortByDate = (firstCard, secondCard) => dayjs(secondCard.filmInfo.release.date)
  .diff(dayjs(firstCard.filmInfo.release.date));

const sortByRating = (firstCard, secondCard) => secondCard.filmInfo.totalRating - firstCard.filmInfo.totalRating;

const sortByComments = (firstCard, secondCard) => secondCard.comments.length - firstCard.comments.length;

export {sortByComments, sortByDate, sortByRating};
