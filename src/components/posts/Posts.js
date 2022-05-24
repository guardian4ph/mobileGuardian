import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, StatusBar, ScrollView, FlatList } from "react-native";

import Navbar from "../layout/Navbar";
import PostItem from "./PostItem";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "../layout/CustomStatusBar";
import AnnouncementCarousel from "../announcement/AnnouncementCarousel";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";
import Spinner from "../layout/Spinner";
import Annoucement from "../announcement/Annoucement";

const Posts = () => {
  const {
    state: { posts, loading },
    getPosts,
  } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  const getmore = () => {
    getPosts(posts.length);
  };

  // const [state, setState] = useState();

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <SafeAreaProvider>
        <CustomStatusBar backgroundColor="#215a75" />
        <FlatList
          ListHeaderComponent={
            <>
              <Annoucement />
              <AnnouncementCarousel />
            </>
          }
          onEndReached={getmore}
          data={posts}
          renderItem={({ item }) => <PostItem post={item} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          key={posts._id}
        />

        <Navbar />
      </SafeAreaProvider>
    );
  }
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
