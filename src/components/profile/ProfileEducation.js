import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const ProfileEducation = () => {
  return (
    <View style={styles.vaccinationContainer}>
      <TouchableOpacity>
        <Text style={styles.textVaccination}>PROFILE EDUCATION</Text>
        <Text style={styles.textVaccination}>(Tap and fill-up)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  vaccinationContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 2,
    backgroundColor: "#dc3545",
  },
  textVaccination: {
    fontSize: 18,
    letterSpacing: 1,
    color: "#fff",
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
});

export default ProfileEducation;
