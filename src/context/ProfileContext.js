import createDataContext from "./createDataContext";
import axios from "axios";

const profileReducer = (state, action) => {
  switch (action.type) {
    case "getCurrentProfile":
      return { ...state, profile: action.payload, loading: false };
    case "getProfiles":
      return { ...state, profiles: action.payload, loading: false };
    case "getProfileById":
      return { ...state, profile: action.payload, loading: false };
    case "getProfileCRUD":
      return { ...state, profileCRUD: action.payload, loading: false };
    case "clearProfileCRUD":
      return { ...state, profileCRUD: null, loading: false };
    case "getProfileByIncidentUserId":
      return {
        ...state,
        incidentProfile: action.payload,
        loading: false,
      };
    case "add_error":
      return { ...state, errorMessage: action.payload };

    case "createProfile":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

const getCurrentProfile = (dispatch) => async () => {
  try {
    const res = await axios.get("http://10.128.50.114:5000/api/profile/me");
    dispatch({ type: "getCurrentProfile", payload: res.data });
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

const getProfiles = (dispatch) => async () => {
  try {
    const res = await axios.get("http://10.128.50.114:5000/api/profile");
    dispatch({ type: "getProfiles", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

const getProfileById = (dispatch) => async (userId) => {
  try {
    const res = await axios.get(
      `http://10.128.50.114:5000/api/profile/user/${userId}`
    );
    dispatch({ type: "getProfileById", payload: res.data });
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

const getProfileCRUD = (dispatch) => async (userId) => {
  try {
    const res = await axios.get(
      `http://10.128.50.114:5000/api/profile/user/${userId}`
    );
    dispatch({ type: "getProfileCRUD", payload: res.data });
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

const clearProfileCRUD = (dispatch) => async () => {
  try {
    dispatch({ type: "clearProfileCRUD" });
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

const getProfileByIncidentUserId = (dispatch) => async () => {
  try {
    const res = await axios.get(
      `http://10.128.50.114:5000/api/profile/user/${userId}`
    );
    dispatch({
      type: "getProfileByIncidentUserId",
      payload: res.data,
    });
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
const createProfile =
  (dispatch) =>
  async (formData, edit = false) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(
        "http://10.128.50.114:5000/api/profile",
        formData,
        config
      );
      console.log("Profile", res.data);
      dispatch({ type: "createProfile", payload: res.data });
      // dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
    } catch (err) {
      console.log("createProfile ERROR", err);
    }
  };
export const { Provider, Context } = createDataContext(
  profileReducer,
  {
    getCurrentProfile,
    getProfiles,
    getProfileById,
    getProfileCRUD,
    clearProfileCRUD,
    getProfileByIncidentUserId,
    createProfile,
  },
  {
    profile: null,
    profiles: [],
    profileCRUD: null,
    incidentProfile: null,
    loading: true,
    errorMessage: "",
  }
);
