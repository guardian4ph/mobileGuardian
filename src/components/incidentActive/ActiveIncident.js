import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
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

const ActiveIncident = () => {
  const navigation = useNavigation();
  const { state: incident, loading } = useContext(IncidentConText);

  const [answeredBy, setAnsweredBy] = useState("");
  const [callAnswered, setCallAnswered] = useState(false);

  const {
    state: { responder },
    getResponderbyUserId,
  } = useContext(ResponderConText);

  useEffect(() => {
    getResponderbyUserId(answeredBy.dispatcher_userId);
  }, [answeredBy]);

  useEffect(() => {
    socket.on("getCallHandled", (data) => {
      setAnsweredBy({
        incidentId: data.incidentId,
        dispatcher_userId: data.dispatcher_userId,
        time_received: data.time_received,
        name: data.name,
        lname: data.lname,
      });
      setCallAnswered(true);
    });
  }, []);

  if (!callAnswered) {
    return <Spinner />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.subContainer}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <ActiveVisual answeredBy={answeredBy} incident={incident.incident} />
          <ActiveStatus incident={incident.incident} />
          <ActiveDetails incident={incident.incident} />
          <ActiveComms incident={incident.incident} />
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
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.btnContent, styles.txtWhite]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    backgroundColor: "#ddd",
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
