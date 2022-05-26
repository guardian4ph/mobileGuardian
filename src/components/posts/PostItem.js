import React, { useContext, useState, useEffect, memo, useRef } from "react";
import { Dimensions } from "react-native";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Inter_400Regular,
  Inter_300Light,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Spinner from "../layout/Spinner";
import moment from "moment";
import { Context as ProfileContext } from "../../context/ProfileContext";
import { Video } from "expo-av";
import AppLoading from "expo-app-loading";

const PostItem = ({ post }) => {
  const navigation = useNavigation();
  const {
    state: { profiles },
    getProfiles,
  } = useContext(ProfileContext);
  const [onLoadImage, setLoadImage] = useState(false);
  const video = useRef(null);

  const imageLoading = () => {
    setLoadImage(true);
  };
  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
        : Math.sign(num) * Math.abs(num); // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "M"
        : Math.sign(num) * Math.abs(num); // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };
  const totalReactions = numFormatter(
    post.likes.length +
      post.loves.length +
      post.wows.length +
      post.sads.length +
      post.hahas.length +
      post.angrys.length
  );
  const totalComments = numFormatter(post.comments.length);

  useEffect(() => {
    getProfiles();
  }, []);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_300Light,
    Inter_600SemiBold,
  });

  const timeDifference = () => {
    var current = new Date();
    var formatDate = new Date(post.date);

    var minutes = 60 * 1000;
    var hours = minutes * 60;
    var days = hours * 24;
    var months = days * 30;
    var years = days * 365;

    var elapsed = current - formatDate;

    if (elapsed < minutes) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < hours) {
      return Math.round(elapsed / minutes) + " minutes ago";
    } else if (elapsed < days) {
      return Math.round(elapsed / hours) + " hours ago";
    } else if (elapsed < months) {
      return Math.round(elapsed / days) + " days ago";
    } else if (elapsed < years) {
      return Math.round(elapsed / months) + " months ago";
    } else {
      return Math.round(elapsed / years) + " years ago";
    }
  };

  if (!fontsLoaded && post?.loading) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.subContainer}>
        <View style={styles.componentsTitle}>
          {profiles.length > 0
            ? profiles.map((profile) => {
                if (profile.user._id === post?.user) {
                  return (
                    <View
                      key={profile._id}
                      style={styles.componentsTitleContent}
                    >
                      <View style={styles.shadow}>
                        <Image
                          style={styles.postLogo}
                          source={
                            onLoadImage
                              ? {
                                  uri: `http://10.128.50.114:5000/${profile.profilepic}`,
                                }
                              : require(`../../../assets/defaultImage.png`)
                          }
                          onLoad={() => imageLoading()}
                        />
                      </View>

                      <View>
                        <Text style={styles.postTitle}>
                          {post?.name} {post?.lname}
                        </Text>
                        <Text style={styles.postDate}>
                          {moment(post?.date).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                          {timeDifference()}
                        </Text>
                      </View>
                      <View style={styles.eplipsisMenu}>
                        <AntDesign name="ellipsis1" size={24} color="black" />
                      </View>
                    </View>
                  );
                }
              })
            : null}
        </View>
        <View style={styles.componentsBody}>
          <Text style={styles.postTitle}>{post?.title} </Text>
          <Text
            numberOfLines={4}
            ellipsizeMode="tail"
            style={styles.componentsBodyText}
          >
            {post?.text}
          </Text>
        </View>
        <View style={styles.componentsPhoto}>
          <View
            style={{
              maxWidth: Dimensions.get("window").width,
              height: undefined,
            }}
          >
            {post?.articleImage.substring(0, 4) === "Post" ? (
              post?.articleImage.substring(
                post?.articleImage.length - 3,
                post?.articleImage.length
              ) === "mp4" ? (
                <Video
                  ref={video}
                  style={styles.PostImage}
                  source={{
                    uri: `http://10.128.50.114:5000/${post?.articleImage}`,
                  }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                />
              ) : (
                <Image
                  style={styles.PostImage}
                  source={
                    onLoadImage
                      ? {
                          uri: `http://10.128.50.114:5000/${post?.articleImage}`,
                        }
                      : require(`../../../assets/defaultImage.png`)
                  }
                  onLoad={() => imageLoading()}
                />
              )
            ) : null}
          </View>
        </View>
        <View style={styles.componentsReaction}>
          <View style={[styles.componentsTitleContent, ,]}>
            {totalReactions > 0 && (
              <View style={styles.absoluteLeft}>
                <Text>{totalReactions}</Text>
                <Text> Reactions</Text>
              </View>
            )}

            {post.comments.length > 0 && (
              <View style={styles.absoluteRigth}>
                <Text>{totalComments}</Text>
                <Text> Comments</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.componentsMenu}>
          <TouchableOpacity style={styles.componentsMenuIcons}>
            <AntDesign name="like2" size={20} color="#333" />
            <Text style={[styles.txtDark, styles.fontSmall]}> Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.componentsMenuIcons}
            onPress={() =>
              navigation.navigate("SinglePost", {
                id: post?._id,
              })
            }
          >
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
    flex: 1,
    marginVertical: 3,
  },

  componentsTitle: {
    backgroundColor: "#fff",
    height: 70,
    overflow: "hidden",
  },
  componentsBody: {
    backgroundColor: "#fff",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    fontFamily: "Inter_300Light",
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
    flexDirection: "row",
  },
  absoluteLeft: {
    position: "absolute",
    left: 20,
    flexDirection: "row",
  },

  componentsBodyText: {
    color: "#333",
    fontSize: 14,
    letterSpacing: 0.1,
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

export default memo(PostItem);
