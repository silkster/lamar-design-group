export default {
  setIsDesktop(state, value) {
    state.isDesktop = value;
  },
  setIsLarge(state, value) {
    state.isLarge = value;
  },
  setIsMobile(state, value) {
    state.isMobile = value;
  },
  setIsSmall(state, value) {
    state.isSmall = value;
  },
  setIsTablet(state, value) {
    state.isTablet = value;
  },
  setIsLandscape(state) {
    state.isLandscape = state.screen.width > state.screen.height;
  },
  setIsPortrait(state) {
    state.isPortrait = state.screen.width < state.screen.height;
  },
  setScreen(state, value) {
    state.screen = value;
  },
};
