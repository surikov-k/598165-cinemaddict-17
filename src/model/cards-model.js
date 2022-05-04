import {generateCard} from '../mock/card';
const CARDS_COUNT = 12;


export default class CardsModel {
  #cards = Array.from({length: CARDS_COUNT}, generateCard);

  get cards() {
    return  this.#cards;
  }

  getCard = (cardId) => {
    this.#cards
      .find((card) => card.id === cardId);
  };

  getTopRated(number) {
    return [...this.#cards]
      .sort((a,b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
      .slice(0, number);
  }

  getMostCommented(number) {
    return [...this.#cards]
      .sort((a,b) => b.comments.length - a.comments.length)
      .slice(0, number);
  }
}
