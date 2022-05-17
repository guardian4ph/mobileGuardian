import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import AppLoading from "expo-app-loading";
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

const Profile = ({ navigation }) => {
  const { state, logout } = useContext(AuthContext);
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  });

  useEffect(() => {
    console.log("PROFILE", state);
    if (!state.token) {
      navigation.navigate("Landing");
    }
  }, [state.token]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backBtn}>
          <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
            <Ionicons name="arrow-back-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.componentsContainer}>
          <ProfileTop state={state} />
          <ProfileActions logout={logout} />
          <ProfileAbout />
          {/* Show all post he reacted or commented */}
          <AnnouncementCarousel />
          <PostItem />
        </ScrollView>
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
