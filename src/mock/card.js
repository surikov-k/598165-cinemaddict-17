import {
  getIdGenerator,
  getRandom,
  getRandomDate,
  getRandomElementFrom,
  getRandomInt,
  getTextGenerator,
} from '../utils';

const ACTORS = [
  'Takeshi Kitano',
  'Morgan Freeman ',
  'Brad Pitt',
  'Al Pacino',
  'Robert De Niro',
  'Tom Hanks',
  'Edward Norton',
  'Christian Bale',
  'Ralph Fiennes',
  'Cillian Murphy',
  'Michael Caine',
  'Gary Oldman',
  'Harrison Ford',
  'Leonardo DiCaprio',
  'Matt Damon'
];

const COUNTRIES = [
  'USA',
  'Germany',
  'China',
  'France',
  'Japan',
  'Spain',
  'Russia',
  'Italy',
  'Finland'
];

const DESCRIPTION_PARTS = [
  'oscar-winning film',
  'a war drama about two young people',
  'true masterpiece where love and death are closer to heroes than their family',
  'from the creators of timeless classic "Nu Pogodi!" and "Alice in Wonderland"',
  'a film about a journey that heroes are about to make in finding themselves',
  'with the best fight scenes since Bruce Lee',
];

const DIRECTORS = [
  'Alejandro Gonsales Inarritu',
  'Brad Bird',
  'Tom Ford',
  'Akira Kurosawa',
  'James Cameron',
  'Clint Eastwood',
  'Quentin Tarantino',
  'Chrostopher Nolan'
];

const GENRES = [
  'Adventure',
  'Drama',
  'Comedy',
  'Action',
  'Horror',
  'Animation',
  'Family',
  'Thriller',
  'Sci-Fi'
];

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const TITLE_BEGINNINGS = [
  'A Lion',
  'A Man',
  'A Shark',
  'A Tale Of A Little Bird',
  'Country',
  'Family',
  'Guest',
  'Happiness',
  'Laziness',
  'Pioneers',
  'Raiders',
];

const TITLE_MIDDLES = [
  'In',
  'Of',
  'On',
  'Who Bought',
  'Who Saw',
  'Who Sold',
  'Who Stole',
  'With',
  'Within',
  'Without',
];

const TITLE_ENDINGS = [
  'Him',
  'Himself',
  'The Carpet',
  'The Darkness',
  'The Floor',
  'The Room',
  'The Storm',
  'The Void',
  'The Wall',
  'Themselves',
  'Us',
];

const WRITERS = [
  'Quentin Tarantino',
  'Hayao Miazaki',
  'Takeshi Kitano',
  'Martin Scorsese',
  'Robert Rodrigues',
  'Robert Zemeckis',
  'Stephen Spielberg',
  'Brad Bird'
];

const COMMENTS_IDS_RANGE = 50;

const generateId = getIdGenerator();

const getCommentsIdGenerator = (range) => {
  const generatedIds = new Set();
  return () => {
    let id;
    do {
      id = getRandomInt(0, range - 1).toString();
      if (generatedIds.size >= range) {
        throw new Error('Comment id range limit reached');
      }
    } while (generatedIds.has(id));
    generatedIds.add(id);
    return id;
  };
};

const generateCommentsId = getCommentsIdGenerator(COMMENTS_IDS_RANGE);

const generateCard = () => {
  const generateDescription = getTextGenerator(DESCRIPTION_PARTS);
  return {
    id: generateId().toString(),
    comments: Array
      .from({length: getRandomInt(1, 5)}, generateCommentsId),
    filmInfo: {
      title: `${getRandomElementFrom(TITLE_BEGINNINGS)} ${getRandomElementFrom(TITLE_MIDDLES)} ${getRandomElementFrom(TITLE_ENDINGS)}`,
      alternativeTitle: `${getRandomElementFrom(TITLE_BEGINNINGS)} ${getRandomElementFrom(TITLE_MIDDLES)} ${getRandomElementFrom(TITLE_ENDINGS)}`,
      totalRating: getRandom(0, 9).toFixed(1),
      poster: `images/posters/${getRandomElementFrom(POSTERS)}`,
      ageRating: getRandomInt(0, 18),
      director: getRandomElementFrom(DIRECTORS),
      writers: Array.from({length: getRandomInt(1, 3)}, () => getRandomElementFrom(WRITERS)),
      actors: Array.from({length: getRandomInt(3, 6)}, () => getRandomElementFrom(ACTORS)),
      release: {
        date: getRandomDate(new Date(1900, 0, 1), new Date()).toISOString(),
        releaseCountry: getRandomElementFrom(COUNTRIES),
      },
      runtime: getRandomInt(30, 180),
      genre: Array.from({length: getRandomInt(1, 3)}, () => getRandomElementFrom(GENRES)),
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


