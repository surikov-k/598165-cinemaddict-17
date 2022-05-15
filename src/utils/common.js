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

const getUniqueRandomFromArrayGenerator = (array) => {
  const getRandomIndex = getUniqueRandomFromRange(array.length - 1);
  return () => array[getRandomIndex.next().value];
};

function* idGenerator () {
  let id = 0;
  while (true) {
    yield id++;
  }
}

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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export {
  getRandom,
  getRandomElementFrom,
  getRandomInt,
  getUniqueRandomFromArrayGenerator,
  getUniqueRandomFromRange,
  idGenerator,
  updateItem,
};
