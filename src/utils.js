import dayjs from 'dayjs';
import duration from 'dayjs/esm/plugin/duration';
import relativeTime from 'dayjs/esm/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const formatDate = (date, format) => dayjs(date)
  .format(format);

const formatDuration = (time) => dayjs.duration(time, 'minutes')
  .format('H[h] mm[m]');

const humanizeDate = (date) => {
  const timespan =  dayjs(date).diff(dayjs());
  return dayjs.duration(timespan, 'millisecond').humanize(true);
};

const truncateText = (text, length = 140) => {
  if (text.length <= length) {
    return text;
  }
  return `${text.slice(0, length)}...`;
};

const getRandomInt = (a, b) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandom = (a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  return min + Math.random() * (max - min + 1);
};

const getRandomElementFrom = (array) => array[getRandomInt(0, array.length - 1)];

const capitalizeFirstLetter = (sentence) => `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}`;

const getUniqueRandomFromArrayGenerator = (array) => {
  const getRandomIndex = getUniqueRandomFromRange(array.length - 1);
  return () => array[getRandomIndex.next().value];
};

const getTextGenerator = (textArray) => (min, max) => {
  const textLength = getRandomInt(min,max);
  const getRandomText = getUniqueRandomFromArrayGenerator(textArray);
  const text = Array
    .from({length: textLength}, getRandomText);

  return  `${capitalizeFirstLetter(text.join(', '))}.`;
};

function* idGenerator () {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const getRandomDate = (start, end) => new Date(getRandom(start.getTime(), end.getTime()));

function* getUniqueRandomFromRange(range) {
  const generated = [];
  let random;
  while (true) {
    do {
      random = getRandomInt(0, range - 1);

      if (generated.length >= range) {
        generated.length = 0;
      }
    } while (generated.includes(random));
    generated.push(random);
    yield random;
  }
}

export {
  formatDate,
  formatDuration,
  getRandom,
  getRandomDate,
  getRandomElementFrom,
  getRandomInt,
  getTextGenerator,
  getUniqueRandomFromArrayGenerator,
  getUniqueRandomFromRange,
  humanizeDate,
  idGenerator,
  truncateText,
};
