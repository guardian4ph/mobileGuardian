import { View, Text, StyleSheet, Image } from "react-native";
import React, { useCallback, useContext } from "react";
import { Context as PostContext } from "../../context/PostContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const Reaction = ({
  _id,
  showReaction,
  onClose,
  userLiked,
  userLoved,
  userWows,
  userSads,
  userHahas,
  userAngrys,
}) => {
  const {
    addLike,
    addLove,
    addWow,
    addSad,
    addHaha,
    addAngry,
    removeLike,
    removeLove,
    removeWow,
    removeSad,
    removeHaha,
    removeAngry,
  } = useContext(PostContext);

  const removePrevReaction = useCallback(
    (e) => {
      if (userLiked?.length > 0) {
        removeLike(_id);
      } else if (userLoved?.length > 0) {
        removeLove(_id);
      } else if (userWows?.length > 0) {
        removeWow(_id);
      } else if (userSads?.length > 0) {
        removeSad(_id);
      } else if (userHahas?.length > 0) {
        removeHaha(_id);
      } else if (userAngrys?.length > 0) {
        removeAngry(_id);
      }
    },
    [userLiked, userAngrys, userHahas, userLoved, userSads, userWows]
  );

  if (!showReaction) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => {
            removePrevReaction();
            setTimeout(() => {
              addLike(_id);
            }, 1000);

            onClose();
          }}
        >
          <Image
            style={{ width: 26, height: 26 }}
            source={require(`../../../assets//icons/reactions/like.png`)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            removePrevReaction();
            setTimeout(() => {
              addLove(_id);
            }, 1000);

            onClose();
          }}
        >
          <Image
            style={{ width: 26, height: 26 }}
            source={require(`../../../assets//icons/reactions/love.png`)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            removePrevReaction();
            setTimeout(() => {
              addWow(_id);
            }, 1000);

            onClose();
          }}
        >
          <Image
            style={{ width: 26, height: 26 }}
            source={require(`../../../assets//icons/reactions/wow.png`)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            removePrevReaction();
            setTimeout(() => {
              addSad(_id);
            }, 1000);

            onClose();
          }}
        >
          <Image
            style={{ width: 26, height: 26 }}
            source={require(`../../../assets//icons/reactions/sad.png`)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            removePrevReaction();
            setTimeout(() => {
              addHaha(_id);
            }, 1000);

            onClose();
          }}
        >
          <Image
            style={{ width: 26, height: 26 }}
            source={require(`../../../assets//icons/reactions/haha.png`)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            removePrevReaction();
            setTimeout(() => {
              addAngry(_id);
            }, 1000);

            onClose();
          }}
        >
          <Image
            style={{ width: 26, height: 26 }}
            source={require(`../../../assets//icons/reactions/angry.png`)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 310,
    width: "38%",

    justifyContent: "center",
    zIndex: 10,
    marginTop: 5,
    marginLeft: 5,
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export default Reaction;
