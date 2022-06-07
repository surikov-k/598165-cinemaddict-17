const truncateText = (text, length = 140) => {
  if (text.length <= length) {
    return text;
  }
  return `${text.slice(0, length)}...`;
};

export {
  truncateText,
};
