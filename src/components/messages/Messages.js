import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Messages = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color="#215a75"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.MessagesContainer}>
        <Text>Messages</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#215a75",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  MessagesContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    bottom: Platform.OS === "android" ? 10 : 20,
    backgroundColor: "#ddd",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 5,
  },
});
export default Messages;
