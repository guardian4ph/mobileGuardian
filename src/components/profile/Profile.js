import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
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
    state: { posts, loading },
    getPosts,
  } = useContext(PostContext);

  const { state, logout } = useContext(AuthContext);

  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  });

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

  if (!fontsLoaded && state.loading) {
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

  backBtn: {
    top: Platform.OS === "android" ? 35 : 60,
    position: "absolute",

    left: 13,
    zIndex: 10,
  },
});

export default Profile;
