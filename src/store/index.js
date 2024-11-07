import { createStore } from 'vuex';

import { login, getinfo } from '@/api/manager';

import { setToken, removeToken } from '@/composables/auth';

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

    // 退出登入
    logout({ commit }) {
      // 移除 cookie 裡的 token
      removeToken();

      // 清除當前用戶狀態 vuex
      commit('SET_USERINFO', {});
    }
  },
});

export default store;
