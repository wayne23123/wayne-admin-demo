import { createStore } from 'vuex';

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
});

export default store;
