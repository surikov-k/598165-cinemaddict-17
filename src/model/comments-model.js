import {generateComment} from '../mock/comment';
const COMMENTS_COUNT = 40;


export default class CommentsModel {
  comments = Array.from({length: COMMENTS_COUNT}, generateComment);

  getComments = () => this.comments;
}
