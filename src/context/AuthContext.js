import createDataContext from "./createDataContext";
import guardian from "../api/guardian";
import { Storage } from "expo-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const registerUser = (dispatch) => {
  return async ({ name, lname, number, email, password }) => {
    try {
      const res = await guardian.post("/api/users", {
        name,
        lname,
        number,
        email,
        password,
      });
      await Storage.setItem({
        key: "token",
        value: JSON.stringify(res.data.token),
      });

      const item = JSON.parse(await Storage.getItem({ key: `token` }));
      console.log("LOCAL STORE TOKEN", item);
      console.log(res.data);
    } catch (err) {
      console.log("Error", err.message);
    }
  };
};

const login = (dispatch) => {
  return ({ email, password }) => {};
};

const logout = (dispatch) => {
  return () => {
    //Cleat State
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { registerUser, login, logout },
  { isAuthenticated: null }
);
