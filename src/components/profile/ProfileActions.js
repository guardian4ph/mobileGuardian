import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const ProfileActions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Text style={styles.textName}>Create Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.textName}>Education</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.textName}>Trainings</Text>
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
  },
  nameContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignItems: "flex-end",
    marginRight: 20,
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
