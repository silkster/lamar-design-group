import { createStore } from 'vuex';
import actions from './root.actions.js';
import mutations from './root.mutations.js';
import state from './root.state.js';
import device from './modules/device';
import site from './modules/site';
import company from './modules/company';

export default createStore({
  namespaced: true,
  state,
  mutations,
  actions,
  modules: {
    company,
    device,
  },
  site,
});
