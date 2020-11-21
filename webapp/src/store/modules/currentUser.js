// eslint-disable-next-line
import axios from "axios";

const state = {
  user: {},
  error: '',
  isLoggedIn: 0,
};
const getters = {};
const actions = {
    getUser({commit}){
        axios.get("http://localhost:8000/api/user")
        .then( response => {
            commit('setUser', response.data);
        })
    },

  login({commit}, credentials) {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8000/api/apilogin", {
            email: credentials.email,
            password: credentials.password
        }).then(response => {
          if (response.data.access_token) {
            localStorage.setItem("user_access_token", response.data.access_token);
            
            commit('setUser', response.data);
            commit('isLoggedIn', 1)
            axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("user_access_token");
            resolve(response)
          }

          if(response.data.message) {
            reject(response.data.message)
          }

        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
},
  
};
const mutations = {
    setUser( state, data){
        state.user = data;
    },
    error(state, data) {
      return state.error = data
  },
  isLoggedIn(state, data) {
    return state.isLoggedIn = data
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
