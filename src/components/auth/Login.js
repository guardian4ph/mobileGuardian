import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";

const Login = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_200ExtraLight,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const { state, login, storageLogin, loadUser, remove_error } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState(true);

  const togglePassword = () => {
    if (passwordType === true) {
      setPasswordType(false);
      return;
    }
    setPasswordType(true);
  };

  const [token, setToken] = useState("");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setToken(value);
        storageLogin();
        loadUser();
        navigation.navigate("Posts");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getData();
  }, [token]);

  useEffect(() => {
    if (state?.token) {
      loadUser();
      navigation.navigate("Posts");
    }
  }, [state.token]);

  const onSubmit = async () => {
    try {
      login({ email, password });
    } catch (err) {
      console.log(err);
    }
  };

  if (!fontsLoaded) {
    return <Spinner />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {state.errorMessage !== "" && (
          <Alert msg={state.errorMessage} remove_error={remove_error} />
        )}

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
            <View style={{ paddingTop: 40 }}></View>
            <TextInput
              style={styles.inputStyle}
              placeholder="E-mail"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#333"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <View style={{ position: "relative" }}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordType}
                placeholderTextColor="#333"
                value={password}
                onChangeText={setPassword}
              />
              <View
                style={{
                  position: "absolute",
                  height: "100%",
                  right: 7,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity onPress={togglePassword}>
                  <EvilIcons name="eye" size={24} color="#215a75" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => onSubmit()}
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
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
                onPress={() => navigation.navigate("ForgotPass")}
              >
                <Text style={[styles.txtMain]}> Forgot</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
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
  modalAlert: {
    height: "35%",
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33333350",
    overflow: "hidden",
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
    width: 200,
    paddingVertical: 10,

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
