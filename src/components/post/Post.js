import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "../layout/Navbar";
import PostItem from "../posts/PostItem";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "../layout/CustomStatusBar";
import AnnouncementCarousel from "../announcement/AnnouncementCarousel";
const Post = (props) => {
  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor="#215a75" />
      <ScrollView style={styles.viewContainer}>
        <AnnouncementCarousel />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </ScrollView>
      <Navbar />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#215a75",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  componentsContainer: {
    width: "98%",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 5,
  },
  inputStyle: {
    height: 40,
    width: "100%",
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 3,
  },
  btnView: {
    borderColor: "#fff",
    borderRadius: 5,
    height: 38,
    width: 120,
    padding: 10,
    marginHorizontal: 3,
    marginVertical: 10,
  },
  viewContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 46,
    left: 0,
    right: 0,
    bottom: 77,
  },
  btnContent: {
    fontSize: 13,
    textAlign: "center",
  },
  btnMain: {
    backgroundColor: "#215a75",
  },
  btnSecondary: {
    backgroundColor: "#ddd",
  },
  txtWhite: {
    color: "#fff",
  },
  txtDark: {
    color: "#333",
  },
  txtMain: {
    color: "#215a75",
  },
  fontSmall: {
    fontSize: 12,
  },
});

export default Post;
