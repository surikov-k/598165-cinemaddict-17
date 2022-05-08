import {
  idGenerator,
  getRandom,
  getRandomElementFrom,
  getRandomInt,
  getUniqueRandomFromRange, getUniqueRandomFromArrayGenerator,
} from '../utils/common';

import {getTextGenerator} from '../utils/text';
import {getRandomDate} from '../utils/datetime';

import {
  ACTORS,
  COUNTRIES,
  DESCRIPTION_PARTS,
  DIRECTORS,
  GENRES,
  POSTERS,
  TITLE_BEGINNINGS,
  TITLE_MIDDLES,
  TITLE_ENDINGS,
  WRITERS
} from './card-data.js';

import CommentsModel from '../model/comments-model';

const id = idGenerator();

const commentId = getUniqueRandomFromRange(CommentsModel.getCommentsNumber());

const generateCard = () => {
  const generateDescription = getTextGenerator(DESCRIPTION_PARTS);
  const getRandomWriter = getUniqueRandomFromArrayGenerator(WRITERS);
  const getRandomActor = getUniqueRandomFromArrayGenerator(ACTORS);
  const getRandomGenre = getUniqueRandomFromArrayGenerator(GENRES);

  return {
    id: id.next().value.toString(),
    comments: Array
      .from({length: getRandomInt(1, 5)}, () => commentId.next().value.toString()),
    filmInfo: {
      title: `${getRandomElementFrom(TITLE_BEGINNINGS)} ${getRandomElementFrom(TITLE_MIDDLES)} ${getRandomElementFrom(TITLE_ENDINGS)}`,
      alternativeTitle: `${getRandomElementFrom(TITLE_BEGINNINGS)} ${getRandomElementFrom(TITLE_MIDDLES)} ${getRandomElementFrom(TITLE_ENDINGS)}`,
      totalRating: getRandom(0, 9).toFixed(1),
      poster: `images/posters/${getRandomElementFrom(POSTERS)}`,
      ageRating: getRandomInt(0, 18),
      director: getRandomElementFrom(DIRECTORS),
      writers: Array.from({length: getRandomInt(1, 3)}, getRandomWriter),
      actors: Array.from({length: getRandomInt(3, 6)}, getRandomActor),
      release: {
        date: getRandomDate(new Date(1900, 0, 1), new Date()).toISOString(),
        releaseCountry: getRandomElementFrom(COUNTRIES),
      },
      runtime: getRandomInt(30, 180),
      genre: Array.from({length: getRandomInt(1, 3)}, getRandomGenre),
      description: generateDescription(3, 5),
    },
    userDetails: {
      watchlist: getRandomInt(0, 1),
      alreadyWatched: getRandomInt(0, 1),
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: getRandomInt(0, 1),
    }
  };
};

export {generateCard};


