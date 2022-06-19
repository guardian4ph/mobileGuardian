import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

const ActiveStatus = ({ cancelled }) => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 700);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      {cancelled ? (
        <View style={{ display: showText ? "none" : "flex" }}>
          <Text style={[styles.statusText, { color: "red" }]}>CANCELLED</Text>
          <Text
            style={{
              color: "#dc3545",
              letterSpacing: 0.5,
              paddingTop: 5,
              textAlign: "center",
            }}
          >
            STATUS
          </Text>
        </View>
      ) : (
        <View style={{ display: showText ? "none" : "flex" }}>
          <Text style={[styles.statusText]}>ACKNOWLEDGED</Text>
          <Text
            style={{
              color: "#dc3545",
              letterSpacing: 0.5,
              paddingTop: 5,
              textAlign: "center",
            }}
          >
            STATUS
          </Text>
        </View>
      )}
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
  statusText: {
    fontSize: 25,
    letterSpacing: 0.5,
    color: "#28a745",
  },
});
export default ActiveStatus;
