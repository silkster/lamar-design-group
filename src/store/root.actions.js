import { getScreenSize } from '@/util/modules/viewport';

export default {
  updateViewport({ commit }) {
    commit('setViewport', getScreenSize());
  },
  updateFontScale({ commit }) {
    const { width } = getScreenSize();
    const baseWidth = 1920;
    const baseScale = 100;
    if (width < baseWidth) {
      const scale = (width / baseWidth) * 100;
      commit('setFontScale', scale < 50 ? 50 : scale);
      commit('setFontScaleStyle', scale < 50 ? 50 : scale);
    } else {
      commit('setFontScale', baseScale);
      commit('setFontScaleStyle', baseScale);
    }
  },
};
