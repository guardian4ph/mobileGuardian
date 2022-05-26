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
    case "getPost":
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case "addComment":
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
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

    console.log("callled", res.data);
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err,
    });
  }
};

const getPost = (dispatch) => async (id) => {
  try {
    const res = await axios.get(`http://10.128.50.114:5000/api/posts/${id}`);
    dispatch({ type: "getPost", payload: res.data });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err,
    });
  }
};

const addComment = (dispatch) => async (postId, formData) => {
  console.log("Context AddComment", postId, formData);
  try {
    const res = await axios.post(
      `http://10.128.50.114:5000/api/posts/comment/${postId}`,
      formData
    );

    dispatch({ type: "addComment", payload: res.data });
    console.log("Response", res.data);
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err,
    });
  }
};

export const { Provider, Context } = createDataContext(
  PostReducer,
  { getPosts, getPost, addComment },
  {
    posts: [],
    post: null,
    loading: true,
    errorMessage: {},
  }
);
