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

export {
  formatDate,
  formatDuration,
  humanizeDate,
};
