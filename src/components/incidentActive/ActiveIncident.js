import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ActiveVisual from "./ActiveVisual";
import ActiveDetails from "./ActiveDetails";
import ActiveComms from "./ActiveComms";
import ActiveETA from "./ActiveETA";
import ActiveStatus from "./ActiveStatus";
import socket from "../socket/Socket";
import { useNavigation } from "@react-navigation/native";
import { Context as IncidentConText } from "../../context/IncidentContext";
import { Context as ResponderConText } from "../../context/ResponderContext";
import Spinner from "../layout/Spinner";
import CancelModal from "../incidentActive/CancelModal";
import MessageModal from "./MessageModal";

const ActiveIncident = () => {
  const navigation = useNavigation();
  const [incidentClose, setIncidentClose] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const {
    state: { incident, loading, cancelled },
    incidentCancelled,
    volunteerIncidentClose,
    clearIncident,
  } = useContext(IncidentConText);
  const [showCancel, setShowCancel] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [answeredBy, setAnsweredBy] = useState("");
  const [callAnswered, setCallAnswered] = useState(false);
  const [responderProfile, setResponderProfile] = useState("");

  const {
    state: { responder },
    getResponderbyUserId,
  } = useContext(ResponderConText);

  useEffect(() => {
    getResponderbyUserId(answeredBy?.dispatcher_userId);
  }, [answeredBy]);

  useEffect(() => {
    let isMounted = true;
    socket.on("getCallHandled", (data) => {
      if (isMounted) {
        setAnsweredBy({
          incidentId: data.incidentId,
          dispatcher_userId: data.dispatcher_userId,
          time_received: data.time_received,
          name: data.name,
          lname: data.lname,
        });
        setCallAnswered(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (responder) {
      setResponderProfile(responder[0]);
    }
  }, [responder]);

  // console.log("Responder", responderProfile.user._id);
  console.log("New Message", arrivalMessage);
  useEffect(() => {
    if (arrivalMessage) {
      setShowMessage(true);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    let isMounted = true;
    socket.on("getMessage", (data) => {
      if (isMounted) {
        if (data.senderId === answeredBy?.dispatcher_userId) {
          setArrivalMessage({
            incidentId: data.incidentId,
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
          });
          // setShow(true);
          // getIncidentMessages(incident?._id);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [responderProfile]);

  useEffect(() => {
    // if (incidentClose || cancelled) {
    if (cancelled) {
      const timer = setTimeout(() => {
        navigation.navigate("Posts");
        clearIncident();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [cancelled]);

  useEffect(() => {
    let isMounted = true;
    socket.on(
      "getCloseIncident",
      ({ senderId, report, summary, opcenName, opcenProfilepic }) => {
        if (isMounted) {
          volunteerIncidentClose({
            senderId,
            report,
            summary,
            opcenName,
            opcenProfilepic,
            status: true,
          });
          setIncidentClose(true);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    // if (incidentClose || cancelled) {

    if (incidentClose) {
      // const timer = setTimeout(() => {
      navigation.navigate("IncidentClose");
      console.log("incident Close");
      // }, 1000);
      // return () => clearTimeout(timer);
    }
  }, [incidentClose]);

  if (!callAnswered || loading) {
    return <Spinner />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.subContainer}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <ActiveVisual answeredBy={answeredBy} incident={incident} />
          <ActiveStatus incident={incident} cancelled={cancelled} />
          <ActiveDetails incident={incident} />
          <ActiveComms answeredBy={answeredBy} responder={responder} />
          <ActiveETA responder={responder} />

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              style={[styles.btnView, styles.btnDanger]}
              onPress={() => setShowCancel(true)}
            >
              <Text style={[styles.btnContent, styles.txtWhite]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <CancelModal
          socket={socket}
          show={showCancel}
          onClose={() => setShowCancel(false)}
          incidentCancelled={incidentCancelled}
          responder={responder}
          incident={incident}
        />
        <MessageModal
          responder={responder}
          answeredBy={answeredBy}
          show={showMessage}
          onClose={() => setShowMessage(false)}
          arrivalMessage={arrivalMessage}
        />
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#215a75",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    backgroundColor: "#215a75",
    borderRadius: 10,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnView: {
    borderColor: "#fff",
    borderRadius: 5,
    height: 50,
    width: "98%",
    padding: 10,

    justifyContent: "center",
    marginVertical: 4,
  },

  btnContent: {
    fontSize: 13,
    textAlign: "center",
    color: "#fff",
  },
  btnDanger: {
    backgroundColor: "#dc3545",
  },
});

export default ActiveIncident;
