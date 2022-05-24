import createDataContext from "./createDataContext";
import uuid from "react-native-uuid";

const id = uuid.v4();

const alertReducer = (state, action) => {
  switch (action.type) {
    case "setAlert":
      return [...state, action.payload];
    case "removeAlert":
      return state.filter((alert) => alert.id !== action.payload);
  }
};

const setAlert =
  (dispatch) =>
  (msg, alertType, timeout = 5000) => {
    dispatch({ type: "setAlert", payload: { msg, alertType, id } });
    setTimeout(() => dispatch({ type: "removeAlert", payload: id }), timeout);
  };

export const { Provider, Context } = createDataContext(
  alertReducer,
  { setAlert },
  []
);
