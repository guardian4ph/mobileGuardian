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
import { Context as ProfileContext } from "../../context/ProfileContext";

const Profile = ({ navigation }) => {
  const {
    state: { posts },
    getPosts,
    clearPost,
  } = useContext(PostContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { profile, loading },
    getCurrentProfile,
  } = useContext(ProfileContext);

  useEffect(() => {
    clearPost();
  }, []);
  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getCurrentProfile();
  }, []);

  const getmore = () => {
    getPosts(posts.length);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.componentsContainer}
          ListHeaderComponent={
            <>
              <ProfileTop user={user} profile={profile} />
              <ProfileActions profile={profile} />
              <ProfileAbout profile={profile} />
              <AnnouncementCarousel />
            </>
          }
          onEndReached={getmore}
          data={posts}
          renderItem={({ item }) => <PostItem post={item} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          key={posts?._id}
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
