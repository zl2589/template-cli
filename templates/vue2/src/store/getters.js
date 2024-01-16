const getter = {
  userInfo: state => {
    return state.userInfo || sessionStorage.getItem("username");
  }
};

export default getter;
