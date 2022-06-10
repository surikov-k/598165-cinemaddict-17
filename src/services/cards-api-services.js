import ApiService from '../framework/api-service';
import {Method} from '../const';

export default class CardsApiServices extends ApiService {
  get cards() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  async update(card)  {
    const response = await this._load({
      url: `movies/${card.id}`,
      method: Method.PUT,
      body: JSON.stringify(CardsApiServices.#adaptToServer(card)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  static #adaptToServer(card) {
    return {
      id: card.id,
      comments: [...card.comments],
      'film_info': {
        title: card.filmInfo.title,
        'alternative_title': card.filmInfo.alternativeTitle,
        'total_rating': card.filmInfo.totalRating,
        poster: card.filmInfo.poster,
        'age_rating': card.filmInfo.ageRating,
        director: card.filmInfo.director,
        writers: [...card.filmInfo.writers],
        actors: [...card.filmInfo.actors],
        release: {
          date: card.filmInfo.release.date,
          'release_country': card.filmInfo.release.releaseCountry,
        },
        runtime: card.filmInfo.runtime,
        genre: [...card.filmInfo.genre],
        description: card.filmInfo.description,
      },
      'user_details': {
        watchlist: card.userDetails.watchlist,
        'already_watched': card.userDetails.alreadyWatched,
        'watching_date': card.userDetails.watchingDate,
        favorite: card.userDetails.favorite,
      }
    };
  }
}
