const COMMENTS_COUNT = 50;

export default class CommentsModel {
  #comments = null;

  constructor(comments) {
    this.#comments = comments;
  }

  get comments () {
    return this.#comments;
  }

  getComment (commentId) {
    return this.#comments.find((comment) => comment.id === commentId);
  }

  static getCommentsNumber = () => COMMENTS_COUNT;
}
