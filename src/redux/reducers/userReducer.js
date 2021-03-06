const initialState = {
  postItems: [],
  loading: false,
  error: null,
};

const userposts = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "CREATE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        postItems: action.payload,
      };
    case "CREATE_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userposts;
