import React from "react";
import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native";
// eslint-disable-next-line
export default () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#215a75" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //  Platform formatting
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});
