import React, { useEffect, useContext } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "../layout/Navbar";
import PostItem from "./PostItem";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "../layout/CustomStatusBar";
import AnnouncementCarousel from "../announcement/AnnouncementCarousel";

const Posts = (props) => {
  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor="#215a75" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.viewContainer}
      >
        <AnnouncementCarousel />
        <PostItem />
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
  viewContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 46,
    left: 0,
    right: 0,
    bottom: 77,
  },
});

export default Posts;
