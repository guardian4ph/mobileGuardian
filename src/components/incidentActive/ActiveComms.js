import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ActiveComms = ({ answeredBy, responder }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("IncidentMessenger", {
            answeredBy,
            responder,
          })
        }
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Feather name="message-square" size={30} color="#215a75" />

          <Text style={{ color: "#dc3545", letterSpacing: 0.5, paddingTop: 5 }}>
            MESSENGER
          </Text>
        </View>
      </TouchableOpacity>
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
