import Observable from '../framework/observable';
import {id} from '../mock/comment';
import {getUserName} from '../utils/common';

const COMMENTS_COUNT = 50;
const USER_NAME = getUserName();

export default class CommentsModel extends Observable{
  #comments = null;
  #cardsModel = null;

  constructor(comments, cardsModel) {
    super();
    this.#comments = comments;
    this.#cardsModel = cardsModel;
  }

  getComments(card) {
    const comments = [];
    card.comments.forEach((commentId) => {
      comments.push(this.#comments.find((comment) => comment.id === commentId));
    });
    return comments;
  }

  add(updateType, data) {
    const {card, comment} = data ;

    const newComment = {
      ...comment,
      id: id.next().value.toString(),
      author: USER_NAME,
      date: new Date()
    };

    this.#comments = [
      newComment,
      ...this.#comments
    ];

    card.comments.push(newComment.id);
    this._notify(updateType, {card, comment: newComment});
  }

  delete(updateType, data) {
    const {card, commentId} = data;
    const index = this.#comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      throw new Error('Can\'t delete a non-existent comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1)
    ];

    card.comments = card.comments.filter((comment) => comment !== commentId);
    this._notify(updateType, data);
  }

  static getCommentsNumber = () => COMMENTS_COUNT;
}

