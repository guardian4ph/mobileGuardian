import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
  const navigation = useNavigation();
  const {
    state: { user, token },
    logout,
  } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigation.navigate("Landing");
    }
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={logout}
          style={[styles.btnView, styles.btnMain]}
        >
          <Text style={[styles.btnContent, styles.txtDark]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#215a75",
    position: "relative",
  },
  nameContainer: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
  },
  txtWhite: {
    color: "#fff",
  },
  txtDark: {
    color: "#215a75",
  },
  textName: {
    fontSize: 12,

    color: "#333",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    paddingHorizontal: 5,
  },
  btnView: {
    borderColor: "#fff",
    borderRadius: 5,
    height: 38,
    width: 120,
    padding: 10,
    marginHorizontal: 3,
    marginVertical: 10,
  },
  btnContent: {
    fontSize: 13,
    textAlign: "center",
  },
  btnMain: {
    backgroundColor: "#fff",
  },
  btnSecondary: {
    backgroundColor: "#ddd",
  },
});

export default Setting;
