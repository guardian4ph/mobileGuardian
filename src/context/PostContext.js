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
    case "deleteComment":
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        },
        loading: false,
      };
    case "addLike":
    case "removeLike":
      return {
        ...state,
        //update the likes buy post ID
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        post: { ...state.post, likes: action.payload.likes },
        loading: false,
      };
    case "addLove":
    case "removeLove":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, loves: action.payload.loves }
            : post
        ),
        post: { ...state.post, loves: action.payload.loves },

        loading: false,
      };
    case "addWow":
    case "removeWow":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, wows: action.payload.wows }
            : post
        ),
        post: { ...state.post, wows: action.payload.wows },
        loading: false,
      };
    case "addSad":
    case "removeSad":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, sads: action.payload.sads }
            : post
        ),
        post: { ...state.post, sads: action.payload.sads },
        loading: false,
      };
    case "addHaha":
    case "removeHaha":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, hahas: action.payload.hahas }
            : post
        ),
        post: { ...state.post, hahas: action.payload.hahas },
        loading: false,
      };
    case "addAngry":
    case "removeAngry":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, angrys: action.payload.angrys }
            : post
        ),
        post: { ...state.post, angrys: action.payload.angrys },
        loading: false,
      };
    case "clear_post":
      return {
        posts: [],
        post: null,
        loading: true,
        errorMessage: {},
      };
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
    console.log("Posts Loading");
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) =>
        dispatch({
          type: "add_error",
          payload: `${error.msg}`,
        })
      );
    }
  }
};

const getPost = (dispatch) => async (id) => {
  try {
    const res = await axios.get(`http://10.128.50.114:5000/api/posts/${id}`);
    dispatch({ type: "getPost", payload: res.data });
    console.log("Fetching Post");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const addComment = (dispatch) => async (postId, formData) => {
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
      payload: { err },
    });
  }
};

const clearPost = (dispatch) => async () => {
  try {
    dispatch({ type: "clearPost" });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const deleteComment = (dispatch) => async (postId, commentId) => {
  try {
    await axios.delete(
      `http://10.128.50.114:5000/api/posts/comment/${postId}/${commentId}`
    );
    dispatch({ type: "deleteComment", payload: commentId });
    console.log("post deleted");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const addLike = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/like/${id}`
    );
    dispatch({
      type: "addLike",
      payload: { id, likes: res.data },
    });
    console.log("Like Added");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const removeLike = (dispatch) => async (id) => {
  console.log("Like Remove");
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/unlike/${id}`
    );
    dispatch({
      type: "removeLike",
      payload: { id, likes: res.data },
    });
    console.log("Like Remove =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const addLove = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/love/${id}`
    );
    dispatch({
      type: "addLove",
      payload: { id, loves: res.data },
    });
    console.log("Love Added =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const removeLove = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/unlove/${id}`
    );
    dispatch({
      type: "removeLove",
      payload: { id, loves: res.data },
    });
    console.log("Love Remove =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const addWow = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/wow/${id}`
    );
    dispatch({
      type: "addWow",
      payload: { id, wows: res.data },
    });
    console.log("Wow Added =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const removeWow = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/unwow/${id}`
    );
    dispatch({
      type: "removeWow",
      payload: { id, wows: res.data },
    });
    console.log("Wow Remove =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const addSad = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/sad/${id}`
    );
    dispatch({
      type: "addSad",
      payload: { id, sads: res.data },
    });
    console.log("Sad Added =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const removeSad = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/unsad/${id}`
    );
    dispatch({
      type: "removeSad",
      payload: { id, sads: res.data },
    });
    console.log("Sad Remove =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const addHaha = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/haha/${id}`
    );
    dispatch({
      type: "addHaha",
      payload: { id, hahas: res.data },
    });
    console.log("haha Added =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const removeHaha = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/unhaha/${id}`
    );
    dispatch({
      type: "removeHaha",
      payload: { id, hahas: res.data },
    });
    console.log("Haha Remove =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const addAngry = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/angry/${id}`
    );
    dispatch({
      type: "addAngry",
      payload: { id, angrys: res.data },
    });
    console.log("Angry Added =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

const removeAngry = (dispatch) => async (id) => {
  try {
    const res = await axios.put(
      `http://10.128.50.114:5000/api/posts/unangry/${id}`
    );
    dispatch({
      type: "removeAngry",
      payload: { id, angrys: res.data },
    });
    console.log("Angry Remove =====>");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: { err },
    });
  }
};

export const { Provider, Context } = createDataContext(
  PostReducer,
  {
    getPosts,
    getPost,
    addComment,
    clearPost,
    deleteComment,
    addLike,
    addLove,
    addWow,
    addSad,
    addHaha,
    addAngry,
    removeLike,
    removeLove,
    removeWow,
    removeSad,
    removeHaha,
    removeAngry,
  },
  {
    posts: [],
    post: null,
    loading: true,
    errorMessage: {},
  }
);
