import { createStore } from 'vuex';

import { getinfo } from '@/api/manager';

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
