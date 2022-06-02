import { StyleSheet, View, KeyboardAvoidingView, Keyboard } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Context as ProfileContext } from "../../context/ProfileContext";
import { Context as PostContext } from "../../context/PostContext";
import { Platform } from "expo-modules-core";

const CommentForm = ({ postId }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const {
    state: { profile },
    getCurrentProfile,
  } = useContext(ProfileContext);

  const {
    state: { loading },
    addComment,
  } = useContext(PostContext);
  const [text, setText] = useState("");

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
      console.log("didshow");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
      console.log("didHide");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    getCurrentProfile();
  }, []);

  const onSubmit = async () => {
    if (!profile) {
      console.log("Modal, Please add a profile to start commenting");
    } else {
      try {
        addComment(postId, { text });
        setText("");
      } catch (err) {
        console.log(`Registration Error ${err}`);
      }
    }
  };

  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ width: "100%", position: "relative" }}>
        {Platform.OS === "ios" ? (
          <View
            style={[
              keyboardStatus ? styles.containerWith : styles.containerWithout,
            ]}
          >
            <View style={{ width: "80%", zIndex: 99 }}>
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                placeholderTextColor="#333"
                placeholder="Leave comment"
                value={text}
                onChangeText={setText}
                multiline
                autoFocus={true}
                editable
                onSubmitEditing={Keyboard.dismiss}
              ></TextInput>
            </View>
            <View
              style={{
                justifyContent: "center",
                width: "20%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => onSubmit()}>
                <Feather name="send" size={24} color="#215a75" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[styles.containerWithout]}>
            <View style={{ width: "80%", zIndex: 99 }}>
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                placeholderTextColor="#333"
                placeholder="Leave comment"
                value={text}
                onChangeText={setText}
                multiline
                autoFocus={true}
                editable
              ></TextInput>
            </View>
            <View
              style={{
                justifyContent: "center",
                width: "20%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => onSubmit()}>
                <Feather name="send" size={24} color="#215a75" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  inputStyle: {
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "100%",
    marginHorizontal: 5,
  },
  containerWithout: {
    position: "absolute",
    bottom: 91,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  containerWith: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

export default CommentForm;
