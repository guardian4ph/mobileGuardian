import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ActiveDetails = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          letterSpacing: 0.2,
          textAlign: "center",
          paddingHorizontal: 10,
          color: "#333",
        }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        127 Eskina duol, dapit sa Inyo, Barangay Uno, Mandaue City, Philippines
      </Text>
      <Text style={{ color: "#dc3545", letterSpacing: 0.5, paddingTop: 5 }}>
        LOCATION
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
    height: "16%",
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 2,
  },
});
export default ActiveDetails;
