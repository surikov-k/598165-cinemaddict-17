import {generateComment} from '../mock/comment';

const COMMENTS_COUNT = 50;

export default class CommentsModel {
  #comments = Array.from({length: COMMENTS_COUNT}, generateComment);

  get comments () {
    return this.#comments;
  }

  getComment (commentId) {
    return this.#comments.find((comment) => comment.id === commentId);
  }

  static getCommentsNumber = () => COMMENTS_COUNT;
}
