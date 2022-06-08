import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import ActiveVisual from "./ActiveVisual";
import ActiveDetails from "./ActiveDetails";
import ActiveComms from "./ActiveComms";
import ActiveETA from "./ActiveETA";
import ActiveStatus from "./ActiveStatus";

import { useNavigation } from "@react-navigation/native";

const ActiveIncident = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.subContainer}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ActiveVisual />
        <ActiveStatus />
        <ActiveDetails />
        <ActiveComms />
        <ActiveETA />

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
