import React, { useContext, useEffect, memo } from "react";
import { FlatList } from "react-native";
import Navbar from "../layout/Navbar";
import PostItem from "./PostItem";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "../layout/CustomStatusBar";
import AnnouncementCarousel from "../announcement/AnnouncementCarousel";
import { Context as PostContext } from "../../context/PostContext";
import Spinner from "../layout/Spinner";
import Annoucement from "../announcement/Annoucement";

const Posts = () => {
  const {
    state: { posts, loading },
    getPosts,
    clearPost,
  } = useContext(PostContext);

  useEffect(() => {
    clearPost();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  const getmore = () => {
    getPosts(posts?.length);
  };

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
          initialNumToRender={5}
          key={posts?._id}
          style={{ marginBottom: 91, padding: 5 }}
        />

        <Navbar />
      </SafeAreaProvider>
    );
  }
};

export default memo(Posts);
