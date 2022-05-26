import React, { useContext, useEffect, memo } from "react";

import { ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Spinner from "../layout/Spinner";
import { Context as PostContext } from "../../context/PostContext";
import CustomStatusBar from "../layout/CustomStatusBar";
import Navbar from "../layout/Navbar";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const SinglePost = ({ navigation, route }) => {
  const {
    state: { post, loading },
    getPost,
  } = useContext(PostContext);

  useEffect(() => {
    getPost(route.params.id);
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
          <ScrollView>
            <PostItem post={post} />
            <CommentForm postId={post?._id} />
            {post?.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post?._id}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>

        <Navbar />
      </SafeAreaProvider>
    );
  }
};

export default memo(SinglePost);
