import React from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const EditProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
            <Feather name="user" size={24} color="#215a75" />
            <Text style={styles.txtMain}>Edit Your Profile</Text>
          </View>
          <Text style={[styles.txtDark, styles.fontSmall]}>
            Tell us about yourself
          </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Address"
            autoCapitalize="none"
            autoCorrect={false}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Gender"
            autoCapitalize="none"
            autoCorrect={false}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Civil Status"
            autoCapitalize="none"
            autoCorrect={false}
          ></TextInput>

          <TextInput
            style={styles.inputStyle}
            placeholder="Birthday"
            autoCapitalize="none"
            autoCorrect={false}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Company"
            autoCapitalize="none"
            autoCorrect={false}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Contact Person"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          ></TextInput>
          <View>
            <Text style={[styles.txtDark, styles.fontSmall]}>
              Person to contact in case of emergency
            </Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            placeholder="09XXXXXXXXX"
            autoCapitalize="none"
            autoCorrect={false}
          ></TextInput>

          <View>
            <Text style={[styles.txtDark, styles.fontSmall]}>
              Contact number
            </Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            placeholder="Blood Type"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          ></TextInput>
          <TouchableOpacity style={[styles.btnView, styles.btnMain]}>
            <Text style={[styles.btnContent, styles.txtWhite]}>
              EditProfile
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Text style={[styles.txtDark]}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={[styles.txtMain]}> Sign In</Text>
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

export default EditProfile;
