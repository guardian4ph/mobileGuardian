import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Ionicons,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

const Navbar = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.componentsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
            <Feather name="home" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.txtWhite, styles.btnContent]}>Home</Text>
        </View>
        <View style={styles.componentsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
            <FontAwesome name="id-badge" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.txtWhite, styles.btnContent]}>ID</Text>
        </View>
        <View style={styles.componentsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
            <MaterialIcons name="add-alert" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.txtWhite, styles.btnContent]}>Report</Text>
        </View>
        <View style={styles.componentsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
            <Feather name="message-square" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.txtWhite, styles.btnContent]}>Messages</Text>
        </View>
        <View style={styles.componentsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
            <Ionicons name="person-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.txtWhite, styles.btnContent]}>Profile</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#215a75",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 77,
    zIndex: 99,
  },
  subContainer: {
    paddingTop: Platform.OS === "android" ? 20 : 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    flexDirection: "row",
  },
  componentsContainer: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 5,
  },
  inputStyle: {
    height: 40,
    width: "100%",
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 3,
  },
  btnView: {
    borderColor: "#fff",
    borderRadius: 5,
    height: 38,
    width: 120,
    padding: 10,
    marginHorizontal: 3,
    marginVertical: 10,
  },
  btnContent: {
    fontSize: 11,
    textAlign: "center",
    paddingTop: 3,
    letterSpacing: 0.2,
  },
  btnMain: {
    backgroundColor: "#215a75",
  },
  btnSecondary: {
    backgroundColor: "#ddd",
  },
  txtWhite: {
    color: "#fff",
  },
  txtDark: {
    color: "#333",
  },
  txtMain: {
    color: "#215a75",
  },
  fontSmall: {
    fontSize: 12,
  },
});

export default Navbar;
