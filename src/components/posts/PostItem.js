import React, { useContext, useState, useEffect, memo, useRef } from "react";
import { Dimensions } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Pressable,
} from "react-native";
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
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";
import { Video } from "expo-av";
import { captureRef } from "react-native-view-shot";
import Reaction from "../post/Reaction";

const PostItem = ({ onPress, post }) => {
  const viewRef = useRef();
  const navigation = useNavigation();
  const {
    state: { user },
  } = useContext(AuthContext);
  const { addLike } = useContext(PostContext);
  const {
    state: { profiles },
    getProfiles,
  } = useContext(ProfileContext);
  const [onLoadImage, setLoadImage] = useState(false);
  const video = useRef(null);
  const [showReaction, setShowReaction] = useState(false);

  const imageLoading = () => {
    setLoadImage(true);
  };

  const sharePost = async () => {
    try {
      const uri = await captureRef(viewRef, { format: "png", quality: 0.7 });
      await Share.share({ url: uri, message: "#guardianPH" });
    } catch (err) {
      console.error(err);
    }
  };

  const userLiked = post?.likes?.filter((el) => {
    return el.user === user?._id;
  });
  const userLoved = post?.loves?.filter((el) => {
    return el.user === user?._id;
  });
  const userWows = post?.wows?.filter((el) => {
    return el.user === user?._id;
  });
  const userSads = post?.sads?.filter((el) => {
    return el.user === user?._id;
  });
  const userHahas = post?.hahas?.filter((el) => {
    return el.user === user?._id;
  });
  const userAngrys = post?.angrys?.filter((el) => {
    return el.user === user?._id;
  });

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

  const [totalReactions, setTotalReactions] = useState();
  const [numLikes, setNumLikes] = useState();
  const [numLoves, setNumLoves] = useState();
  const [numWows, setNumWows] = useState();
  const [numSads, setNumSads] = useState();
  const [numHahas, setNumHahas] = useState();
  const [numAngrys, setNumAngrys] = useState();
  useEffect(() => {
    setTotalReactions(
      numFormatter(
        post?.likes?.length +
          post?.loves?.length +
          post?.wows?.length +
          post?.sads?.length +
          post?.hahas?.length +
          post?.angrys?.length
      )
    );
    setNumLikes(numFormatter(post?.likes?.length));
    setNumLoves(numFormatter(post?.loves?.length));
    setNumWows(numFormatter(post?.wows?.length));
    setNumSads(numFormatter(post?.sads?.length));
    setNumHahas(numFormatter(post?.hahas?.length));
    setNumAngrys(numFormatter(post?.angrys?.length));
  }, [post, onPress]);

  const totalComments = numFormatter(post?.comments.length);

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
    return <Spinner />;
  } else {
    return (
      <View style={styles.subContainer}>
        <View ref={viewRef} collapsable={false}>
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
                            {moment(post?.date).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}{" "}
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
          {showReaction ? (
            <Reaction
              onPress={onPress}
              _id={post?._id}
              showReaction
              userLiked={userLiked}
              userLoved={userLoved}
              userWows={userWows}
              userSads={userSads}
              userHahas={userHahas}
              userAngrys={userAngrys}
              onClose={() => setShowReaction(false)}
            />
          ) : null}
          <View style={styles.componentsReaction}>
            <View style={[styles.componentsTitleContent, ,]}>
              {totalReactions > 0 && (
                <View
                  key={post?._id}
                  style={[
                    styles.absoluteLeft,
                    { alignItems: "center", justifyContent: "center" },
                  ]}
                >
                  {post?.likes?.length > 0 && (
                    <View style={styles.reaction}>
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={
                          onLoadImage
                            ? require(`../../../assets/icons/reactions/like.png`)
                            : require(`../../../assets/defaultImage.png`)
                        }
                        onLoad={() => imageLoading()}
                      />
                      <Text style={{ marginLeft: -2 }}> {numLikes}</Text>
                    </View>
                  )}
                  {post?.loves?.length > 0 && (
                    <View style={styles.reaction}>
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={
                          onLoadImage
                            ? require(`../../../assets/icons/reactions/love.png`)
                            : require(`../../../assets/defaultImage.png`)
                        }
                        onLoad={() => imageLoading()}
                      />
                      <Text style={{ marginLeft: -2 }}> {numLoves}</Text>
                    </View>
                  )}
                  {post?.wows?.length > 0 && (
                    <View style={styles.reaction}>
                      <Image
                        style={{ width: 21, height: 21 }}
                        source={
                          onLoadImage
                            ? require(`../../../assets/icons/reactions/wow.png`)
                            : require(`../../../assets/defaultImage.png`)
                        }
                        onLoad={() => imageLoading()}
                      />
                      <Text style={{ marginLeft: -2 }}> {numWows}</Text>
                    </View>
                  )}
                  {post?.sads?.length > 0 && (
                    <View style={styles.reaction}>
                      <Image
                        style={{ width: 22, height: 22 }}
                        source={
                          onLoadImage
                            ? require(`../../../assets/icons/reactions/sad.png`)
                            : require(`../../../assets/defaultImage.png`)
                        }
                        onLoad={() => imageLoading()}
                      />
                      <Text style={{ marginLeft: -2 }}> {numSads}</Text>
                    </View>
                  )}
                  {post?.hahas?.length > 0 && (
                    <View style={styles.reaction}>
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={
                          onLoadImage
                            ? require(`../../../assets/icons/reactions/haha.png`)
                            : require(`../../../assets/defaultImage.png`)
                        }
                        onLoad={() => imageLoading()}
                      />
                      <Text style={{ marginLeft: -2 }}> {numHahas}</Text>
                    </View>
                  )}
                  {post?.angrys?.length > 0 && (
                    <View style={styles.reaction}>
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={
                          onLoadImage
                            ? require(`../../../assets/icons/reactions/angry.png`)
                            : require(`../../../assets/defaultImage.png`)
                        }
                        onLoad={() => imageLoading()}
                      />
                      <Text style={{ marginLeft: -2 }}> {numAngrys}</Text>
                    </View>
                  )}
                  {totalReactions > 10 && (
                    <>
                      {" "}
                      <Text> Total</Text>
                      <Text> {totalReactions}</Text>
                    </>
                  )}
                </View>
              )}

              {post?.comments?.length > 0 && (
                <View style={styles.absoluteRigth}>
                  <Text> {totalComments}</Text>
                  <Text> Comments</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.componentsMenu}>
          <Pressable
            style={styles.componentsMenuIcons}
            //  onPress={() => updateLike(post._id)}
            // delayLongPress={2000}
            onPress={() => setShowReaction(true)}
            activeOpacity={0.6}
          >
            {userLiked?.length !== 0 ? (
              <View style={styles.flexRow}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require(`../../../assets/icons/reactions/like.png`)}
                />
                <Text
                  style={[
                    styles.txtDark,
                    styles.fontSmall,
                    { fontFamily: "Inter_600SemiBold", color: "#3d6f86" },
                  ]}
                >
                  {" "}
                  Like
                </Text>
              </View>
            ) : userLoved?.length !== 0 ? (
              <View style={styles.flexRow}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require(`../../../assets/icons/reactions/love.png`)}
                />
                <Text
                  style={[
                    styles.txtDark,
                    styles.fontSmall,
                    { fontFamily: "Inter_600SemiBold", color: "#3d6f86" },
                  ]}
                >
                  {" "}
                  Love
                </Text>
              </View>
            ) : userWows?.length !== 0 ? (
              <View style={styles.flexRow}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require(`../../../assets/icons/reactions/wow.png`)}
                />
                <Text
                  style={[
                    styles.txtDark,
                    styles.fontSmall,
                    { fontFamily: "Inter_600SemiBold", color: "#3d6f86" },
                  ]}
                >
                  {" "}
                  Wow
                </Text>
              </View>
            ) : userSads?.length !== 0 ? (
              <View style={styles.flexRow}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require(`../../../assets/icons/reactions/sad.png`)}
                />
                <Text
                  style={[
                    styles.txtDark,
                    styles.fontSmall,
                    { fontFamily: "Inter_600SemiBold", color: "#3d6f86" },
                  ]}
                >
                  {" "}
                  Sad
                </Text>
              </View>
            ) : userHahas?.length !== 0 ? (
              <View style={styles.flexRow}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require(`../../../assets/icons/reactions/haha.png`)}
                />
                <Text
                  style={[
                    styles.txtDark,
                    styles.fontSmall,
                    { fontFamily: "Inter_600SemiBold", color: "#3d6f86" },
                  ]}
                >
                  {" "}
                  Haha
                </Text>
              </View>
            ) : userAngrys?.length !== 0 ? (
              <View style={styles.flexRow}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require(`../../../assets/icons/reactions/angry.png`)}
                />
                <Text
                  style={[
                    styles.txtDark,
                    styles.fontSmall,
                    { fontFamily: "Inter_600SemiBold", color: "#3d6f86" },
                  ]}
                >
                  {" "}
                  Angry
                </Text>
              </View>
            ) : (
              <View style={styles.flexRow}>
                <AntDesign name="like2" size={20} color="#333" />
                <Text style={[styles.txtDark, styles.fontSmall]}> Like</Text>
              </View>
            )}
          </Pressable>

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
          <TouchableOpacity
            style={styles.componentsMenuIcons}
            onPress={sharePost}
          >
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
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  reaction: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 1,
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
