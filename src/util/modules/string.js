export const shiftFirstWord = (str) => {
  const [left, ...right] = str.split(' ');
  return {
    left,
    right: right.join(' '),
  };
};

export default {
  shiftFirstWord,
};
