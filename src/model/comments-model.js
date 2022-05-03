import {generateComment} from '../mock/comment';

const COMMENTS_COUNT = 50;

export default class CommentsModel {
  #cards = null;
  #comments = null;

  constructor(cards) {
    this.#cards = cards;
    this.#comments = Array.from({length: COMMENTS_COUNT}, generateComment);
  }

  getComments = (cardId) =>{
    const foundCard = this.#cards.find((card) => card.id === cardId);
    if (!foundCard) {
      throw new Error(`Card with ID ${cardId} isn't found`);
    }
    return this.#comments
      .filter((comment) => foundCard.comments.includes(comment.id));
  };

  static getCommentsNumber = () => COMMENTS_COUNT;
}
