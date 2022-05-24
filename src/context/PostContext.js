import createDataContext from "./createDataContext";
import axios from "axios";

const PostReducer = (state, action) => {
  switch (action.type) {
    case "getPosts":
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
      };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const getPosts = (dispatch) => async (skip) => {
  try {
    const res = await axios.get(
      `http://10.128.50.114:5000/api/posts?skip=${skip}`
    );
    dispatch({ type: "getPosts", payload: res.data });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err,
    });
  }
};

export const { Provider, Context } = createDataContext(
  PostReducer,
  { getPosts },
  {
    posts: [],
    post: null,
    loading: true,
    errorMessage: {},
  }
);
