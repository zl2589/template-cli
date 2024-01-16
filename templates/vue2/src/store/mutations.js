import * as types from "./mutation-types";

const mutations = {
  [types.GET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  }
};

export default mutations;
