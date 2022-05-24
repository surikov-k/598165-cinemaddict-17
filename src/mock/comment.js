import {getRandomElementFrom, idGenerator} from '../utils/common';
import {getTextGenerator} from '../utils/text';
import {getRandomDate} from '../utils/datetime';

import {
  COMMENT_TEXT_PARTS,
  EMOTIONS,
  FIRST_NAMES,
  LAST_NAMES,
} from './comment-data';

const ONE_YEAR_DURATION = 365 * 24 * 60 * 60 * 1000;
const aYearAgo = Date.now() - ONE_YEAR_DURATION;
const id = idGenerator();

const generateComment = () => {
  const generateCommentText = getTextGenerator(COMMENT_TEXT_PARTS);
  return {
    id: id.next().value.toString(),
    author: `${getRandomElementFrom(FIRST_NAMES)} ${getRandomElementFrom(LAST_NAMES)}`,
    comment: generateCommentText(2, 4),
    date: getRandomDate(new Date(aYearAgo), new Date()).toISOString(),
    emotion: getRandomElementFrom(EMOTIONS),
  };
};

export {generateComment, id};
