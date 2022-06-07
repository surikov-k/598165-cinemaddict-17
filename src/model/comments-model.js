import Observable from '../framework/observable';
import CardsModel from './cards-model';

export default class CommentsModel extends Observable {
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  async get(card) {
    let comments;
    try {
      comments = await this.#apiService.get(card.id);
    } catch (err) {
      comments = [];
    }
    return comments;
  }

  async add(updateType, data) {
    const {card, comment} = data;

    try {
      const response = await this.#apiService.add(comment, card.id);
      const payload = {
        card: CardsModel.adaptToClient(response.movie),
        comments: response.comments,
      };
      card.comments = [...payload.card.comments];
      this._notify(updateType, payload);
    } catch (err) {
      throw new Error('Can\'t add the comment');
    }
  }

  async delete(updateType, data) {
    const {card, commentId} = data;
    try {
      await this.#apiService.delete(commentId);
      card.comments = card.comments.filter((comment) => comment !== commentId);
      this._notify(updateType, data);

    } catch (err) {
      throw new Error('Can\'t delete the comment');
    }
  }
}

