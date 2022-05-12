import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const ProfileTop = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackGround}
        source={require("../../../assets/img/Landing/bg1.png")}
      />
      <View style={{ position: "absolute", right: 20, top: 12 }}>
        <Entypo name="camera" size={24} color="#ddd" />
      </View>

      <View style={styles.photoContainer}>
        <View style={{ position: "relative" }}>
          <Image
            style={styles.profileImage}
            source={require("../../../assets/img/Profile/profile.jpg")}
          />
        </View>
        <View style={{ position: "absolute", right: 20, bottom: 12 }}>
          <Entypo name="camera" size={24} color="#ddd" />
        </View>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}> Cloyd Dedicatoria</Text>
      </View>
    </View>
  );
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
    left: 15,
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
