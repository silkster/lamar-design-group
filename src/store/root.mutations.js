export default {
  setViewport(state, viewport) {
    state.viewport = viewport;
  },
  setFontScale(state, scale) {
    state.fontScale = scale;
  },
  setFontScaleStyle(state, scale) {
    state.fontScaleStyle = {
      '--font-scale': `${scale}%`,
    };
  },
};
