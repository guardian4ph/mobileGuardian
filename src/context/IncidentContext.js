import createDataContext from "./createDataContext";
import axios from "axios";

const IncidentReducer = (state, action) => {
  switch (action.type) {
    case "submitIncident":
      return {
        ...state,
        createIncident: true,
        incident: action.payload, //from the action file
        loading: false,
      };
    case "missedCall":
      return {
        ...state,
        missedCall: action.payload, //from the action file
        loading: false,
      };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const submitIncident =
  (dispatch) =>
  async ({
    user,
    name,
    lname,
    number,
    type,
    scompleteaddress,
    scity,
    sstate,
    sarea,
    slat,
    slng,
    status,
    reportedDate,
  }) => {
    console.log("Hit by App", reportedDate);
    try {
      const res = await axios.post("http://10.128.50.114:5000/api/incident", {
        user,
        name,
        lname,
        number,
        type,
        scompleteaddress,
        scity,
        sstate,
        sarea,
        slat,
        slng,
        status,
        reportedDate,
      });
      dispatch({
        type: "submitIncident",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: err.msg,
      });
    }
  };

const missedCall =
  (dispatch) =>
  async ({
    user,
    name,
    lname,
    number,
    type,
    scompleteaddress,
    scity,
    sstate,
    sarea,
    slat,
    slng,
    status,
    reportedDate,
  }) => {
    try {
      const res = await axios.post(
        "http://10.128.50.114:5000/api/incident/missed",
        {
          user,
          name,
          lname,
          number,
          type,
          scompleteaddress,
          scity,
          sstate,
          sarea,
          slat,
          slng,
          status,
          reportedDate,
        }
      );
      dispatch({
        type: "missedCall",
        payload: res.data,
      });
      console.log("Incident Reported");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: err.msg,
      });
    }
  };

export const { Provider, Context } = createDataContext(
  IncidentReducer,
  { submitIncident, missedCall },
  {
    createIncident: false,
    incident: null,
    inicidents: null,
    loading: true,
    errorMessage: "",
  }
);
