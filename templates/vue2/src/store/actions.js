import * as types from "./mutation-types";

export default {
  async saveUserInfo({ commit }, userInfo) {
    if (userInfo !== "") {
      sessionStorage.setItem("username", userInfo.username);
      commit(types.GET_USER_INFO, userInfo);
    } else {
      sessionStorage.removeItem("username");
    }
  }
};
