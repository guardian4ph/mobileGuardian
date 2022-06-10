import createDataContext from "./createDataContext";
import axios from "axios";

const responderReducer = (state, action) => {
  switch (action.type) {
    case "getResponderbyUserId":
      return {
        responder: action.payload, //from the action file
        loading: false,
      };

    default:
      return state;
  }
};

const getResponderbyUserId = (dispatch) => async (user_id) => {
  try {
    const res = await axios.get(
      `http://10.128.50.114:5000/api/responder/user/${user_id}`
    );
    dispatch({
      type: "getResponderbyUserId",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err.msg,
    });
  }
};

export const { Provider, Context } = createDataContext(
  responderReducer,
  { getResponderbyUserId },
  {
    responder: null,
    loading: true,
    errorMessage: "",
  }
);
