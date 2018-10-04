import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
    state: {
        data: null,
        updatedUser: null
    },
    getters: {
        data: state => {
            return state.data;
        },
        updatedUser: state => {
            return state.updatedUser;
        }
    },
    mutations: {
        updateData(state, responseData) {
            state.data = responseData.data;
        },
        updateUpdatedUser(state, responseData) {
            state.updatedUser = responseData.data;
        }
    },
    actions: {
        loadData ({state}) {
            Vue.axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
                state.data = response.data;
            });
        },
        updateUser ({state}, {id, user}) {
            Vue.axios.patch('https://jsonplaceholder.typicode.com/users/' + id, user).then((response) => {
                state.updatedUser = response.data;
            });
        }
    }
});