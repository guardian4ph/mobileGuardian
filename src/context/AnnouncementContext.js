import createDataContext from "./createDataContext";
import axios from "axios";

const AnnouncementReducer = (state, action) => {
  switch (action.type) {
    case "getAnnouncement":
      return { ...state, announcements: action.payload, loading: false };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const getAnnouncement = (dispatch) => async () => {
  try {
    const res = await axios.get("http://10.128.50.114:5000/api/announcement");
    dispatch({ type: "getAnnouncement", payload: res.data });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err,
    });
  }
};

export const { Provider, Context } = createDataContext(
  AnnouncementReducer,
  { getAnnouncement },
  {
    announcements: [],
    announcement: null,
    displayed: false,
    loading: true,
    errorMessage: "",
  }
);
