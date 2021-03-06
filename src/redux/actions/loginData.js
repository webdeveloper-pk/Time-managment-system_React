import axios from "axios";

const fetchPost = (user) => async (dispatch) => {
  const email = user.email;
  const password = user.password;

  dispatch(requestPosts());
  try {
    await axios
      .post("http://34.210.129.167/api/login", {
        email,
        password,
      })
      .then((res) => {
        const loginData = res.data;
        dispatch({ type: "FETCH_LOGIN_SUCCESS", payload: loginData });
        // storing token in local storage
        localStorage.setItem("token", loginData.token);
      });
  } catch (error) {
    dispatch({ type: "FETCH_LOGIN_FAILURE", payload: error });
  }
};

const requestPosts = () => {
  return {
    type: "FETCH_LOGIN_REQUEST",
  };
};

const exportObject = {
  fetchPost,
  requestPosts,
};
export default exportObject;
