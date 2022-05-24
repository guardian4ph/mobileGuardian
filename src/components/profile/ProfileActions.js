import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context as ProfileContext } from "../../context/ProfileContext";

const ProfileActions = ({ logout }) => {
  const { state } = useContext(ProfileContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={{ width: "30%" }}></View>
        <View
          style={{
            flexDirection: "row",
            width: "70%",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {state.profile ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.textName}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateProfile")}
            >
              <Text style={styles.textName}>Create Profile</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity>
            <Text style={styles.textName}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.textName}>Log-out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#215a75",
    position: "relative",
  },
  nameContainer: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
  },

  textName: {
    fontSize: 12,

    color: "#fff",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    paddingHorizontal: 5,
  },
});
export default ProfileActions;
