import Observable from '../framework/observable';
import {sortByComments, sortByRating} from '../utils/sort';

export default class CardsModel extends Observable{
  #cards = null;

  constructor(cards) {
    super();
    this.#cards = cards;
  }

  get cards() {
    return  [...this.#cards];
  }

  update(updateType, update) {
    const {card} = update;

    const index = this.#cards.findIndex((it) => it.id === card.id);

    if (index === -1) {
      throw new Error('Can\'t update a non-existent card');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      card,
      ...this.#cards.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  getCard = (cardId) => this.#cards
    .find((card) => card.id === cardId);

  get topRatedCards() {
    return this.cards
      .sort(sortByRating)
      .slice(0, 2)
      .filter((card) => card.filmInfo.totalRating);
  }

  get popularCards() {
    return  this.cards
      .sort(sortByComments)
      .slice(0, 2)
      .filter((card) => card.comments.length);
  }

  get watchedCount() {
    return  this.cards
      .filter((card) => card.userDetails.alreadyWatched)
      .length;
  }
}
