import React from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const Login = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Landing")}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={24}
            color="#215a75"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.componentsContainer}>
          <View style={{ paddingTop: 40 }}></View>
          <TextInput
            style={styles.inputStyle}
            placeholder="E-mail"
            autoCapitalize="none"
            autoCorrect={false}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          ></TextInput>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("Post")}
            style={[styles.btnView, styles.btnMain]}
          >
            <Text style={[styles.btnContent, styles.txtWhite]}>Login</Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={[styles.txtDark]}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Register")}
            >
              <Text style={[styles.txtMain]}> Register</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Text style={[styles.txtDark]}>Forgot password?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("ForgotPass")}
            >
              <Text style={[styles.txtMain]}> Forgot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    // alignItems: "center",
    // justifyContent: "center",
    //  Platform formatting
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  componentsContainer: {
    width: "90%",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 5,
  },
  inputStyle: {
    height: 40,
    width: "100%",
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 3,
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
    backgroundColor: "#215a75",
  },
  btnSecondary: {
    backgroundColor: "#ddd",
  },
  txtWhite: {
    color: "#fff",
  },
  txtDark: {
    color: "#333",
  },
  txtMain: {
    color: "#215a75",
  },
  fontSmall: {
    fontSize: 12,
  },
});

export default Login;
