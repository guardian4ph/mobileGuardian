import React, { useContext, useEffect } from "react";
import { StyleSheet, StatusBar, SafeAreaView, FlatList } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import ProfileTop from "./ProfileTop";
import ProfileActions from "./ProfileActions";
import ProfileAbout from "./ProfileAbout";
import PostItem from "../posts/PostItem";
import AnnouncementCarousel from "../announcement/AnnouncementCarousel";
import Spinner from "../layout/Spinner";
import Navbar from "../layout/Navbar";
import { Context as PostContext } from "../../context/PostContext";

const Profile = ({ navigation }) => {
  const {
    state: { posts },
    getPosts,
  } = useContext(PostContext);

  const { state, logout } = useContext(AuthContext);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!state.token) {
      navigation.navigate("Landing");
    }
  }, [state.token]);
  const getmore = () => {
    getPosts(posts.length);
  };

  if (state.loading) {
    return <Spinner />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.componentsContainer}
          ListHeaderComponent={
            <>
              <ProfileTop authState={state} />
              <ProfileActions logout={logout} />
              <ProfileAbout />
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

        {/* Show all post he reacted or commented */}

        <Navbar />
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#215a75",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  componentsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
});

export default Profile;
