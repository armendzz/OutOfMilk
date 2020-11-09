// eslint-disable-next-line
import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("user_access_token");

const state = {
  items: [],
};
const getters = {
  completedItem(state) {
    return state.items.filter(
      (items) => items.completed == 1 || items.completed === true
    );
  },
  unCompletedItem(state) {
    return state.items.filter(
      (items) => items.completed === 0 || items.completed === false
    );
  },
};
const actions = {
  getItems({ commit }, id) {
    axios.get("http://localhost:8000/api/store/" + id).then((response) => {
      let result = response.data.data;
      commit("getItems", result);
    });
  },

  addItem(context, obj) {
    axios
      .post("http://localhost:8000/api/list", {
        title: obj.title,
        store_id: obj.store,
      })
      .then((response) => {
        console.log(response);
      });
  },
  completeItem(context, id) {
    axios
      .put("http://localhost:8000/api/list/" + id, {
        completed: 1
      })
      .then((response) => {
        console.log(response);
      });
  },
  unCompleteItem(context, id) {
    axios
      .put("http://localhost:8000/api/list/" + id, {
        completed: 0
      })
      .then((response) => {
        console.log(response);
      });
  },
};
const mutations = {
  getItems(state, data) {
    state.items = data;
  },
  ADD_STORE(state, storename) {
    state.store.push(storename);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
