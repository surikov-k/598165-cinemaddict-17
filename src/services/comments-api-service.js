import ApiService from '../framework/api-service';
import {Method} from '../const';

export default class CommentsApiService extends ApiService {
  get(cardId) {
    return this._load({url: `comments/${cardId}`})
      .then(ApiService.parseResponse);
  }

  async add(comment, cardId) {
    const response = await this._load({
      url: `comments/${cardId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return await ApiService.parseResponse(response);
  }

  async delete(commentId) {
    return await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });
  }
}
