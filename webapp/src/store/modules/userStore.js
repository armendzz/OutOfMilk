// eslint-disable-next-line
import axios from "axios";

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("user_access_token");

const state = {
    store: [],
    isFetching: true,
};
const getters = {

    
      storeName: (state) => (id) => {
        return state.store.find(store => store.id == id)
      }
};
const actions = {
    getStore(context){
        axios.get("http://localhost:8000/api/store")
        .then( response => {
            context.commit('setStore', response.data);
            
        })
    },

    addStore(context, storename){
        axios.post("http://localhost:8000/api/store", {
            name: storename.name
        }
        )
        .then( response => {
            console.log(response)
        })
       
    }
};
const mutations = {
    setStore( state, data){
        state.store = data.data;
        state.isFetching = false
    },
    ADD_STORE(state, storename){
        state.store.push(storename)
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
