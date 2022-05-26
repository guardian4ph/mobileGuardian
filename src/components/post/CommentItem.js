import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Context as ProfileContext } from "../../context/ProfileContext";
import { AntDesign } from "@expo/vector-icons";

const CommentItem = ({
  postId,
  comment: { _id, text, name, lname, profilepic, user, date },
}) => {
  const {
    state: { profiles },
    getProfiles,
  } = useContext(ProfileContext);

  const [onLoadImage, setLoadImage] = useState(false);
  const imageLoading = () => {
    setLoadImage(true);
  };

  useEffect(() => {
    getProfiles();
  }, []);
  const timeDifference = () => {
    var current = new Date();
    var formatDate = new Date(date);

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

  return (
    <View style={styles.subContainer}>
      <View style={styles.componentsTitle}>
        {profiles.length > 0
          ? profiles.map((profile) => {
              if (profile.user._id === user) {
                return (
                  <View key={profile._id} style={styles.componentsTitleContent}>
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

                    <View style={{ flex: 1 }}>
                      <Text style={styles.postTitle}>
                        {name} {lname}
                      </Text>
                      <View
                        style={{
                          padding: 3,
                          borderRadius: 5,
                          backgroundColor: "#eee",
                          width: "85%",
                          padding: 5,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{
                            color: "#333",
                            fontSize: 13,
                            paddingLeft: 3,
                          }}
                        >
                          {text}
                        </Text>
                      </View>

                      <Text style={styles.postDate}>{timeDifference()}</Text>
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
      <View style={styles.componentsBody}></View>
    </View>
  );
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
  componentsBodyText: {
    fontFamily: "Inter_300Light",
    color: "#333",
    fontSize: 12,
  },
});
export default CommentItem;
