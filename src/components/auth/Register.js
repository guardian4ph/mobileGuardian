import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";

const Register = ({ navigation }) => {
  const { state, registerUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  console.log("State", state);

  const onSubmit = async () => {
    if (password !== password2) {
      console.log("Password dont match");
    } else {
      try {
        registerUser({ name, lname, number, email, password });
      } catch (err) {
        console.log(`Registration Error ${err}`);
      }
    }
  };

  useEffect(() => {
    if (state.token) {
      navigation.navigate("Posts");
    }
  }, [state.token]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
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
            <Text style={styles.txtMain}>Create Your Account</Text>
          </View>
          <Text style={[styles.txtDark, styles.fontSmall]}>
            Volunteer, and start saving lives and properties.
          </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="First Name"
            value={name}
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setName}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Last Name"
            value={lname}
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setLname}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="09XXXXXXXXX"
            value={number}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setNumber}
          ></TextInput>
          <View>
            <Text style={[styles.txtDark, styles.fontSmall]}>
              This site uses your mobile number for authentication, sending
              alerts and other communication.
            </Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            placeholder="E-mail"
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setEmail}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholderTextColor="#333"
            onChangeText={setPassword}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Confirm Password"
            value={password2}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholderTextColor="#333"
            onChangeText={setPassword2}
          ></TextInput>
          <TouchableOpacity
            style={[styles.btnView, styles.btnMain]}
            onPress={() => onSubmit()}
          >
            <Text style={[styles.btnContent, styles.txtWhite]}>Register</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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

export default Register;
