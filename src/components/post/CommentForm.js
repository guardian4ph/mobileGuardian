import {
  ScrollView,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Context as ProfileContext } from "../../context/ProfileContext";
import { Context as PostContext } from "../../context/PostContext";

const CommentForm = ({ postId }) => {
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
    getCurrentProfile();
  }, []);

  const onSubmit = async () => {
    if (!profile) {
      console.log("Modal, Please add a profile to start commenting");
    } else {
      try {
        addComment(postId, { text });
        setText("");
        console.log(postId, text);
      } catch (err) {
        console.log(`Registration Error ${err}`);
      }
    }
  };

  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={styles.inputStyle}
            multiline
            numberOfLines={4}
            editable
            maxLength={40}
            autoCorrect={false}
            placeholderTextColor="#333"
            placeholder="Leave comment"
            value={text}
            onChangeText={setText}
          />
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => onSubmit()}>
              <Feather name="send" size={24} color="#215a75" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    width: "87%",
    marginHorizontal: 5,
  },
});

export default CommentForm;
