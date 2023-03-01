export const getScreenSize = () => {
  return {
    width:
      Math.max(document.documentElement.clientWidth) || window.innerWidth || 0,
    height:
      Math.max(document.documentElement.clientHeight) ||
      window.innerHeight ||
      0,
  };
};

export const getScreenWidth = () => {
  return getScreenSize().width;
};

export const isScreenWidthInRange = (min, max) => {
  const width = getScreenWidth();
  return width >= min && width <= max;
};

export default {
  getScreenSize,
  getScreenWidth,
  isScreenWidthInRange,
};
