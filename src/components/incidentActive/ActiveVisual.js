import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const ActiveVisual = () => {
  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        <Image
          style={styles.profileImage}
          source={require("../../../assets/IncidentImages/Dispatch.png")}
        />
        <View style={{ position: "absolute", right: 0, bottom: 0 }}>
          <Image
            style={styles.opcenImage}
            source={require("../../../assets/icons/incidentType/Fire.png")}
          />
        </View>
      </View>

      <Text
        style={{
          paddingTop: 10,
          fontSize: 20,
          letterSpacing: 0.5,
          fontWeight: "500",
          color: "#333",
        }}
      >
        CLOYD DEDICATORIA
      </Text>
      <Text style={{ color: "#dc3545", letterSpacing: 0.5, paddingTop: 5 }}>
        DISPATCH
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
    height: "40%",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 2,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 300,
    marginTop: 20,
  },
  opcenImage: {
    width: 60,
    height: 60,
    borderRadius: 300,
    marginHorizontal: 10,
  },
});
export default ActiveVisual;
