import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-web";

import { Context as AnnouncementContext } from "../../context/AnnouncementContext";

const AnnouncementCarousel = () => {
  const { state, getAnnouncement } = useContext(AnnouncementContext);
  const [onLoadImage, setLoadImage] = useState(false);
  const imageLoading = () => {
    setLoadImage(true);
  };

  const [onLoadLogo, setLoadLogo] = useState(false);
  const logoLoading = () => {
    setLoadLogo(true);
  };

  useEffect(() => {
    getAnnouncement();
  }, []);

  const annoucement = () => {
    return state?.announcements.map((el) => {
      return (
        <View style={styles.annoucementContainer} key={el._id}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoOpcen}
              // loadingIndicatorSource={ActivityIndicator}
              source={
                onLoadImage
                  ? {
                      uri: `http://10.128.50.114:5000/${el.opcenLogo}`,
                    }
                  : require(`../../../assets/defaultImage.png`)
              }
              onLoad={() => imageLoading()}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                position: "absolute",
                bottom: 20,
                zIndex: 4,
                width: 120,
                height: 30,
                backgroundColor: "#ddd",
                justifyContent: "center",
                opacity: 0.8,
              }}
            >
              <Text
                style={{
                  color: "#333",
                  paddingHorizontal: 10,
                  zIndex: 18,
                }}
              >
                {el.title}
              </Text>
            </View>

            <Image
              style={{ height: "100%", width: 120 }}
              source={
                onLoadLogo
                  ? { uri: `http://10.128.50.114:5000/${el.articleImage}` }
                  : require(`../../../assets/defaultImage.png`)
              }
              onLoad={() => logoLoading()}
            />
          </View>
        </View>
        // console.log("Array Content", el)
      );
    });
  };

  if (state.announcements.length > 0) {
    return (
      <View style={styles.mainContianer}>
        <ScrollView horizontal={true}>{annoucement()}</ScrollView>
      </View>
    );
  } else {
    return null;
  }
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
    top: 5,
    left: 5,
    zIndex: 5,
  },
  logoOpcen: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderColor: "#215a75",
    borderWidth: 3,
  },
});

export default AnnouncementCarousel;
