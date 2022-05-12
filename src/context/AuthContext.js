import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "register_user":
      return { errorMessage: "", isAuthenticated: true, token: action.payload };
    case "load_user":
      return { ...state, user: action.payload };
    case "logout":
      return {
        token: null,
        isAuthenticated: null,
        isNewUser: null,
        isUser: null,
        loading: true,
        user: null,
        isOpcenAdmin: false,
        isResponder: false,
        layout: null,
        errorMessage: "",
      };
    case "login":
      return {
        errorMessage: "",
        isAuthenticated: true,
        token: action.payload,
      };
    default:
      return state;
  }
};

const registerUser =
  (dispatch) =>
  async ({ name, lname, number, email, password }) => {
    try {
      const res = await axios.post("http://10.128.50.114:5000/api/users", {
        name,
        lname,
        number,
        email,
        password,
      });
      await AsyncStorage.setItem("token", res.data.token);

      dispatch({ type: "register_user", payload: res.data.token });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
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

const login =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const res = await axios.post("http://10.128.50.114:5000/api/auth", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", res.data.token);

      dispatch({ type: "login", payload: res.data.token });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
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

const logout = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      await AsyncStorage.removeItem("token");
      dispatch({ type: "logout" });
      console.log("TOken Logged out");
    } catch (err) {
      console.log(" Logout Success");
    }
  };
};

const loadUser = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      setAuthToken(token);
    }
    try {
      const res = await axios.get("http://10.128.50.114:5000/api/auth");
      dispatch({ type: "load_user", payload: res.data });
    } catch (err) {
      console.log("Error", err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { registerUser, login, logout, loadUser },
  {
    token: AsyncStorage.getItem("token"),
    isAuthenticated: null,
    isNewUser: null,
    isUser: null,
    loading: true,
    user: null,
    isOpcenAdmin: false,
    isResponder: false,
    layout: null,
    errorMessage: "",
  }
);
