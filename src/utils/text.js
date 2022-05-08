import {getRandomInt, getUniqueRandomFromArrayGenerator} from './common';

const capitalizeFirstLetter = (sentence) => `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}`;

const getTextGenerator = (textArray) => (min, max) => {
  const textLength = getRandomInt(min,max);
  const getRandomText = getUniqueRandomFromArrayGenerator(textArray);
  const text = Array
    .from({length: textLength}, getRandomText);

  return  `${capitalizeFirstLetter(text.join(', '))}.`;
};

const truncateText = (text, length = 140) => {
  if (text.length <= length) {
    return text;
  }
  return `${text.slice(0, length)}...`;
};

export {
  getTextGenerator,
  truncateText,
};
