import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  StatusBar,
  TouchableOpacity,
} from "react-native";

const HomeScreen = (props) => {
  const name = "Cloyd Dedicatoria";
  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.text}>Guardian Command and Control</Text>
      <Text style={styles.title}>{name}</Text>

      <View style={styles.center}>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.navigation.navigate("Landing")}
          >
            <Text style={styles.btnContent}>Go to Landing</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("IncidentModal")}
          >
            <Text style={styles.btnContent}>Go to Incident Modal</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.btnView}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Image")}>
            <Text style={styles.btnContent}>Go to Image Screen</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    color: "#eee",
  },
  title: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
  background: {
    backgroundColor: "#215a75",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  btn: {},
  btnContent: {
    color: "#fff",
    fontSize: 16,
  },
  btnView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    height: 50,
    marginTop: 20,
    backgroundColor: "#dc3545",
    width: 200,
  },
  center: {
    display: "flex",
    alignItems: "center",
    // flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default HomeScreen;
