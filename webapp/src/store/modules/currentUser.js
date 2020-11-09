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
  // eslint-disable-next-line
  loginUser({commit}, user) {
    // eslint-disable-next-line
   
    axios
      .post("http://localhost:8000/api/apilogin", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if(response.data.message) {
          commit('error', response.data.message)
          
        }
       
        if (response.data.access_token) {
          localStorage.setItem("user_access_token", response.data.access_token);
          this.$router.push('Store')
        }
      }).catch(function (error) {
        let errorMessage = '';
       if(error.response.status === 422) {
        errorMessage = 'Please fill Email and Password'
       }
        commit('error', errorMessage)
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
            commit('isLoggedIn', 1)
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
  logOut(){
    localStorage.removeItem("user_access_token");
    document.location = "/#/login";
  }
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
