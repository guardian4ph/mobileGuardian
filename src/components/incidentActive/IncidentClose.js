import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import React, { useEffect, useContext } from "react";

import { AntDesign } from "@expo/vector-icons";
import { Context as IncidentConText } from "../../context/IncidentContext";

const IncidentClose = ({ navigation }) => {
  const {
    state: { incidentclose },
    clearIncident,
  } = useContext(IncidentConText);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearIncident();
      navigation.navigate("Posts");
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Image
            style={styles.profileImage}
            source={{
              uri: `http://10.128.50.114:5000/${incidentclose?.opcenProfilepic}`,
            }}
          />
        </View>
        <View
          style={{
            width: "90%",
            // backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 25, paddingVertical: 10, color: "#215a75" }}>
            Incident Closed
          </Text>
          <Text style={{ fontSize: 20 }}>Thank you for Volunteeting!</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 18, paddingVertical: 10 }}>
              Please rate your dispatcher
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="star" size={24} color="gold" />
              <AntDesign name="star" size={24} color="gold" />
              <AntDesign name="star" size={24} color="gold" />
              <AntDesign name="star" size={24} color="gold" />
              <AntDesign name="star" size={24} color="gold" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Posts"), clearIncident();
          }}
          style={[styles.btnView, styles.btnMain, { marginTop: 30 }]}
        >
          <Text style={{ color: "#fff" }}>Go Back to Notifications</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#215a75",
    //  Platform formatting
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 300,
    borderColor: "#215a75",
    borderWidth: 5,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 5,
  },
  btnView: {
    borderColor: "#fff",
    borderRadius: 5,
    height: 50,
    width: 200,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  btnContent: {
    fontSize: 13,
    textAlign: "center",
  },
  btnMain: {
    backgroundColor: "#3d6f86",
  },
});
export default IncidentClose;
