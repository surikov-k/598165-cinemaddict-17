export default class CardsModel {
  #cards = null;

  constructor(cards) {
    this.#cards = cards;
  }

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
