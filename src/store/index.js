import { createStore } from 'vuex';

import { login, getinfo } from '@/api/manager';

import { setToken } from '@/composables/auth';

const store = createStore({
  state() {
    return {
      // 用戶訊息
      user: {},
    };
  },
  mutations: {
    // 紀錄用戶訊息
    SET_USERINFO(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((response) => {
            setToken(response.data.data.token);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 獲取當前登入用戶訊息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo()
          .then((response) => {
            // console.log(response);

            commit('SET_USERINFO', response);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default store;
