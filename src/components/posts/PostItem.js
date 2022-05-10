import React from "react";
import { Dimensions } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
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
import AppLoading from "expo-app-loading";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
const win = Dimensions.get("window");
const PostItem = (props) => {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.subContainer}>
        <View style={styles.componentsTitle}>
          <View style={styles.componentsTitleContent}>
            <View style={styles.shadow}>
              <Image
                style={styles.postLogo}
                source={require("../../../assets/logos/mandaue.png")}
              />
            </View>

            <View>
              <Text style={styles.postTitle}>Mandaue City Command Center</Text>
              <Text style={styles.postDate}>
                March 29, 2022 5:48 PM - 1 month ago
              </Text>
            </View>
            <View style={styles.eplipsisMenu}>
              <AntDesign name="ellipsis1" size={24} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.componentsBody}>
          <Text style={styles.postTitle}>What is Lorem Ipsum? </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.componentsBodyText}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
        <View style={styles.componentsPhoto}>
          <View
            style={{ maxWidth: Dimensions.get("window").width, height: 420 }}
          >
            <Image
              style={styles.PostImage}
              // source={require("../../../assets/annoucement/trees.jpeg")}
              source={{
                uri: "https://guardian.ph/public/Pic-1651194056834.jpg",
              }}
              // source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />
          </View>
        </View>
        <View style={styles.componentsReaction}>
          <View style={[styles.componentsTitleContent, ,]}>
            <View style={styles.absoluteLeft}>
              <Text>Reactions</Text>
            </View>
            <View style={styles.absoluteRigth}>
              <Text>Comments</Text>
            </View>
          </View>
        </View>
        <View style={styles.componentsMenu}>
          <TouchableOpacity style={styles.componentsMenuIcons}>
            <AntDesign name="like2" size={20} color="#333" />
            <Text style={[styles.txtDark, styles.fontSmall]}> Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.componentsMenuIcons}>
            <FontAwesome name="comment-o" size={20} color="#333" />
            <Text style={[styles.txtDark, styles.fontSmall]}> Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.componentsMenuIcons}>
            <FontAwesome name="share-square-o" size={20} color="#333" />
            <Text style={[styles.txtDark, styles.fontSmall]}> Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  subContainer: {
    marginVertical: 3,
  },

  componentsTitle: {
    backgroundColor: "#fff",
    height: 70,
    overflow: "hidden",
  },
  componentsBody: {
    backgroundColor: "#fff",
    height: 75,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  componentsPhoto: {
    backgroundColor: "#ddd",
    height: undefined,
    alignItems: "center",
    justifyContent: "center",
  },

  PostImage: {
    resizeMode: "contain",
    height: 420,
    width: Dimensions.get("window").width,
  },

  componentsReaction: {
    backgroundColor: "#fff",
    height: 40,
  },
  componentsMenu: {
    backgroundColor: "#fff",
    height: 50,
    flexDirection: "row",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  componentsTitleContent: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    maxHeight: 440,
  },
  postLogo: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 50,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#202020",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  postTitle: {
    fontFamily: "Inter_600SemiBold",
    color: "#215a75",
    fontSize: 16,
  },
  postDate: {
    fontFamily: "Inter_400Regular",
    color: "#aaa",
    fontSize: 11,
  },
  eplipsisMenu: {
    position: "absolute",
    right: 20,
  },

  absoluteRigth: {
    position: "absolute",
    right: 20,
  },
  absoluteLeft: {
    position: "absolute",
    left: 20,
  },

  componentsBodyText: {
    fontFamily: "Inter_400Regular",
    color: "#333",
    fontSize: 12,
  },

  componentsMenuIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtDark: {
    color: "#333",
  },
  fontSmall: {
    fontSize: 13,
  },
});

export default PostItem;
