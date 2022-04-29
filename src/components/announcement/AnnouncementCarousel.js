import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { BlurView } from "expo-blur";
import { ImageBackground } from "react-native";

const AnnouncementCarousel = (Props) => {
  const activeAnnouncement = [
    {
      _id: "1",
      articleImage: require("../../../assets/annoucement/Crime/abandon.gif"),
      opcenLogo: require("../../../assets/logos/mandaue.png"),
    },
    {
      _id: "2",
      articleImage: require("../../../assets/annoucement/Crime/abandon.gif"),
      opcenLogo: require("../../../assets/logos/mandaue.png"),
    },
    {
      _id: "3",
      articleImage: require("../../../assets/img/Landing/bg1.png"),
      opcenLogo: require("../../../assets/logos/mandaue.png"),
    },
    {
      _id: "4",
      articleImage: require("../../../assets/annoucement/Crime/shooting.gif"),
      opcenLogo: require("../../../assets/logos/mandaue.png"),
    },
    {
      _id: "5",
      articleImage: require("../../../assets/annoucement/Fire/fireDrill.gif"),
      opcenLogo: require("../../../assets/logos/mandaue.png"),
    },
  ];

  const annoucement = () => {
    return activeAnnouncement.map((el) => {
      return (
        <View style={styles.annoucementContainer} key={el._id}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoOpcen} source={el.opcenLogo} />
          </View>
          <Image style={styles.image} source={el.articleImage} />
        </View>
        // console.log("Array Content", el)
      );
    });
  };

  return (
    <View style={styles.mainContianer}>
      <ScrollView horizontal={true}>{annoucement()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContianer: {
    height: 200,
    flexDirection: "row",
    padding: 5,
  },
  annoucementContainer: {
    position: "relative",
    width: 120,
    height: 190,
    marginRight: 3,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#7a94a0",
    overflow: "hidden",
  },
  image: {
    overflow: "hidden",
    resizeMode: "cover",
    width: "100%",
    maxHeight: 190,
    zIndex: 3,
    borderRadius: 7,
  },

  logoContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 5,
  },
  logoOpcen: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
  },
});

export default AnnouncementCarousel;
