import Observable from '../framework/observable';
import {sortByComments, sortByRating} from '../utils/sort';
import {UpdateType} from '../const';

export default class CardsModel extends Observable {
  #cardsApiService = null;
  #cards = [];

  constructor(cardsApiService) {
    super();
    this.#cardsApiService = cardsApiService;
  }

  async init() {
    try {
      const cards = await this.#cardsApiService.cards;
      this.#cards = cards.map(CardsModel.adaptToClient);
    } catch (err) {
      this.#cards = [];
    }
    this._notify(UpdateType.INIT);
  }

  get cards() {
    return [...this.#cards];
  }

  async update(updateType, update) {
    const {card} = update;

    const index = this.#cards.findIndex((it) => it.id === card.id);

    if (index === -1) {
      throw new Error('Can\'t update a non-existent card');
    }

    try {
      const response = await this.#cardsApiService.update(card);
      const updatedCard = CardsModel.adaptToClient(response);

      this.#cards = [
        ...this.#cards.slice(0, index),
        updatedCard,
        ...this.#cards.slice(index + 1)
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update the task');
    }
  }

  get topRatedCards() {
    return this.cards
      .sort(sortByRating)
      .slice(0, 2)
      .filter((card) => card.filmInfo.totalRating);
  }

  get popularCards() {
    return this.cards
      .sort(sortByComments)
      .slice(0, 2)
      .filter((card) => card.comments.length);
  }

  get watchedCount() {
    return this.cards
      .filter((card) => card.userDetails.alreadyWatched)
      .length;
  }

  static adaptToClient(card) {
    return {
      id: card.id,
      comments: [...card.comments],
      filmInfo: {
        title: card['film_info'].title,
        alternativeTitle: card['film_info']['alternative_title'],
        totalRating: card['film_info']['total_rating'],
        poster: card['film_info'].poster,
        ageRating: card['film_info']['age_rating'],
        director: card['film_info'].director,
        writers: [...card['film_info'].writers],
        actors: [...card['film_info'].actors],
        release: {
          date: card['film_info'].release.date,
          releaseCountry: card['film_info'].release['release_country'],
        },
        runtime: card['film_info'].runtime,
        genre: [...card['film_info'].genre],
        description: card['film_info'].description,
      },
      userDetails: {
        watchlist: card['user_details'].watchlist,
        alreadyWatched: card['user_details']['already_watched'],
        watchingDate: card['user_details']['watching_date'],
        favorite: card['user_details'].favorite,
      }
    };
  }
}
