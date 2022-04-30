import {
  getIdGenerator,
  getRandomDate,
  getRandomElementFrom,
  getTextGenerator
} from '../utils';

const COMMENT_TEXT_PARTS = [
  'a film that changed my life',
  'I fell asleep at the minute two of the film, but later I\'ve woken up',
  'film has nothing to do with it I just felt tired..., actually, film is okay...ish',
  'love all Leo Di Caprio performances. He\'s not in the movie tho',
  'just telling what kinds of movies I like',
  'I think everyone should know',
  'have you noticed the director\'s cameo',
  'such a boring piece of...',
  'post-credit scene was just amazing omg',
  'a true masterpiece',
  'my friend and I went to watch this movie and never made it there so we didn\'t like it at all',
  'love camera work',
  'I know what film is gonna win Oscar this year',
  'a true masterpiece',
  'love all Leo Di Caprio performances',
];

const EMOTIONS = ['angry', 'puke', 'smile', 'sleeping'];

const FIRST_NAMES = [
  'A',
  'Alice',
  'Dakota',
  'Fedor',
  'Ilya',
  'Ivan',
  'Marina',
  'Natasha',
  'Nevada',
  'Sergey',
  'Tim',
];

const LAST_NAMES = [
  'O\'Caml',
  'O\'Mara',
  'O\'Reilly',
  'Ivanov',
  'James',
  'Lee',
  'Makoveev',
  'Romanov',
  'Walker',
];

const ONE_YEAR_DURATION = 365 * 24 * 60 * 60 * 1000;
const aYearAgo = Date.now() - ONE_YEAR_DURATION;

const generateId = getIdGenerator();

const generateComment = () => {
  const generateCommentText = getTextGenerator(COMMENT_TEXT_PARTS);
  return {
    id: generateId().toString(),
    author: `${getRandomElementFrom(FIRST_NAMES)} ${getRandomElementFrom(LAST_NAMES)}`,
    comment: generateCommentText(2, 4),
    date: getRandomDate(new Date(aYearAgo), new Date()).toISOString(),
    emotion: getRandomElementFrom(EMOTIONS),
  };
};

export {generateComment};
