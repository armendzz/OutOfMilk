
import Vue from "vue";
import Vuex from "vuex";
import currentUser from "./modules/currentUser"
import userStore from "./modules/userStore"
import storeItems from './modules/storeItems';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    test: '',
  },
  mutations: {},
  actions: {},
  modules: { currentUser, userStore, storeItems }
});
