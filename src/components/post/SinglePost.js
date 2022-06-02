import React, { useContext, useEffect, memo, useState } from "react";

import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Spinner from "../layout/Spinner";
import { Context as PostContext } from "../../context/PostContext";
import CustomStatusBar from "../layout/CustomStatusBar";
import Navbar from "../layout/Navbar";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const SinglePost = ({ route }) => {
  const [keyboardShow, setKeyboardShow] = useState();

  const {
    state: { post, loading },
    getPost,
    deleteComment,
  } = useContext(PostContext);

  useEffect(() => {
    getPost(route.params.id);
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShow(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShow(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <CustomStatusBar backgroundColor="#215a75" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={[
              keyboardShow ? styles.withKeyboard : styles.withoutKeyboard,
            ]}
          >
            <PostItem post={post} />

            {post?.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post?._id}
                deleteComment={deleteComment}
              />
            ))}
          </ScrollView>
          <CommentForm postId={post?._id} />
          <Navbar />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }
};

const styles = StyleSheet.create({
  withKeyboard: {
    marginBottom: 35,
  },
  withoutKeyboard: {
    marginBottom: 130,
  },
});
export default memo(SinglePost);
