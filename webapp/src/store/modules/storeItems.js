// eslint-disable-next-line
import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("user_access_token");

const state = {
  items: [],
  isupdating: false,
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
      commit('userStore/TOGGLE_LOADING', null, { root: true })
    });
  },
// eslint-disable-next-line
  addItem({state}, obj) {
    state.isupdating = true;
    axios
      .post("http://localhost:8000/api/list", {
        title: obj.title,
        store_id: obj.store,
      })
      .then((response) => {
        console.log(response);
      });
  },
  editItem(context, obj) {
    axios
      .put("http://localhost:8000/api/list/" + obj.id, {
        title: obj.title
      })
      .then((response) => {
        console.log(response);
      });
  },
  deleteItem(context, id) {
    axios
      .delete("http://localhost:8000/api/list/" + id, {
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
  emptyItems({state}) {
    delete axios.defaults.headers.common["Authorization"];
    state.items = []
  },
};
const mutations = {
  getItems(state, data) {
    state.items = data;
    state.isupdating = false;
  },
  EMPTY_ITEMS(state){
    state.items = []
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
