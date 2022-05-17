import {SortType} from '../const';
import dayjs from 'dayjs';

export default class SortingPresenter {
  #sectionPresenter = null;

  constructor(sectionPresenter) {
    this.#sectionPresenter = sectionPresenter;
  }


  sort = (type) => {
    this.#sectionPresenter.clearSection();

    switch (type) {
      case SortType.DEFAULT:
        this.#sectionPresenter.cards = [...this.#sectionPresenter.initialOrderCards];
        break;
      case SortType.RATING:
        this.#sectionPresenter.cards
          .sort((firstCard, secondCard) => secondCard.filmInfo.totalRating - firstCard.filmInfo.totalRating);
        break;
      case SortType.DATE:
        this.#sectionPresenter.cards
          .sort((firstCard, secondCard) => dayjs(firstCard.filmInfo.release.date)
            .diff(dayjs(secondCard.filmInfo.release.date)));
        break;
    }
    this.#sectionPresenter.renderList();
  };
}
