import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Context as ProfileContext } from "../../context/ProfileContext";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import Spinner from "../layout/Spinner";

const ProfileTop = ({ user, profile }) => {
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
  });

  const [onLoadImage, setLoadImage] = useState(false);
  const imageLoading = () => {
    setLoadImage(true);
  };

  if (!fontsLoaded) {
    return <Spinner />;
  } else {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageBackGround}
          source={
            onLoadImage
              ? require("../../../assets/img/Landing/bg1.png")
              : require(`../../../assets/defaultImage.png`)
          }
          onLoad={() => imageLoading()}
        />
        <View style={{ position: "absolute", right: 20, top: 12 }}>
          <Entypo name="camera" size={24} color="#ddd" />
        </View>

        <View style={styles.photoContainer}>
          <View style={{ position: "relative" }}>
            {profile ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri: `http://10.128.50.114:5000/${profile?.profilepic}`,
                }}
              />
            ) : (
              <Image
                style={styles.profileImage}
                source={require("../../../assets/img/Profile/profile.jpg")}
              />
            )}
          </View>
        </View>
        {user ? (
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {" "}
              {user?.name} {user?.lname}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 225,
    width: "100%",
    position: "relative",

    zIndex: 5,
  },
  imageBackgroundContainer: {
    height: 210,
  },
  imageBackGround: {
    resizeMode: "cover",
    height: 225,
    width: "100%",
  },
  photoContainer: {
    position: "absolute",
    bottom: -30,
    left: 10,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 300,
    backgroundColor: "#215a75",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 300,
  },
  nameContainer: {
    position: "absolute",
    left: 165,
    bottom: 5,
  },
  nameTxt: {
    fontSize: 18,
    color: "#fff",
    letterSpacing: 1,
    fontFamily: "Inter_500Medium",
  },
});

export default ProfileTop;
