import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const ActiveComms = () => {
  return (
    <View style={styles.container}>
      <Feather name="message-square" size={30} color="#215a75" />
      <Text style={{ color: "#dc3545", letterSpacing: 0.5, paddingTop: 5 }}>
        MESSENGER
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 2,
  },
});

export default ActiveComms;
