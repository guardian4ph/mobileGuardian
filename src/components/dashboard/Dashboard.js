import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
const deviceHeight = Dimensions.get("screen").height;

const Dashboard = () => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Dashboard;
