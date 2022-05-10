import React from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, AntDesign } from "@expo/vector-icons";
const Otp = (props) => {
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <AntDesign name="key" size={24} color="#215a75" />

            <Text style={styles.txtMain}> One Time Password</Text>
          </View>
          <Text style={[styles.txtDark, styles.fontSmall]}>
            You will receive a One-Time Password (OTP) on your registered mobile
            number.
          </Text>

          <TextInput
            style={styles.inputStyle}
            placeholder="XXXXXX"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholderTextColor="#333"
          ></TextInput>
          <Text style={[styles.txtDark, styles.fontSmall]}>
            Did you receive an OTP?
          </Text>
          <TouchableOpacity style={[styles.btnView, styles.btnSecondary]}>
            <Text style={[styles.btnContent, styles.txtDark]}>Resend OTP</Text>
          </TouchableOpacity>
          <Text style={[styles.txtDark, styles.fontSmall]}>
            If you need to change your mobile number, you may do so through
            Update Profile, or by reaching out to your Operation Center
            Administrator at admin@guardian.ph
          </Text>
          <TouchableOpacity style={[styles.btnView, styles.btnMain]}>
            <Text style={[styles.btnContent, styles.txtWhite]}>Proceed</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingBottom: 20 }}></View>
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
    display: "flex",
    alignItems: "center",
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
    textAlign: "center",
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
    textAlign: "center",
  },
  txtMain: {
    color: "#215a75",
  },
  fontSmall: {
    fontSize: 12,
  },
});

export default Otp;
