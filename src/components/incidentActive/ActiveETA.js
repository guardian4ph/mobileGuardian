import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const ActiveETA = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.opcenImage}
          source={require("../../../assets/logos/mandaue.png")}
        />
        <Text
          style={{
            fontSize: 20,
            letterSpacing: 0.3,
            textAlign: "center",
            paddingHorizontal: 10,
            color: "#333",
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {" "}
          Mandaue City Command Center
        </Text>
      </View>
      <Text style={{ color: "#dc3545", letterSpacing: 0.5 }}>
        OPERATION CENTER
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
    height: "13%",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  opcenImage: {
    width: 50,
    height: 50,
    borderRadius: 300,
    marginHorizontal: 10,
  },
});
export default ActiveETA;
