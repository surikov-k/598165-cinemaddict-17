import {filter} from '../utils/filter';

export const generateFilter = (cards) => Object.entries(filter)
  .map(([filterName, filterTask]) => ({
    name: filterName,
    count: filterTask(cards).length
  }),
  );
