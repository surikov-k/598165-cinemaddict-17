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

const getTextGenerator = (template) => {
  let result = [];
  return (min, max) => {
    const descriptionLength = getRandomInt(min, max);
    while (result.length < descriptionLength) {
      const part = getRandomElementFrom(template);
      if (!result.includes(part)) {
        result.push(part);
      }
    }
    result = result.join(', ');
    return `${result.charAt(0).toUpperCase()}${result.slice(1)}.`;
  };
};

const getIdGenerator =  () => {
  let id = 0;
  return () => id++;
};

const getRandomDate = (start, end) => new Date(getRandom(start.getTime(), end.getTime()));

export {
  formatDate,
  formatDuration,
  getIdGenerator,
  getRandom,
  getRandomDate,
  getRandomElementFrom,
  getRandomInt,
  getTextGenerator,
  humanizeDate,
  truncateText,
};
