import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Comfortaa_500Medium } from "@expo-google-fonts/comfortaa";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Context as AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "./Spinner";

const Landing = () => {
  const { state, loadUser, storageLogin } = useContext(AuthContext);

  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_600SemiBold,
    Inter_700Bold,
    Comfortaa_500Medium,
  });
  const navigation = useNavigation();

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
    loadUser();
  }, [token]);
  useEffect(() => {
    if (state?.token) {
      navigation.navigate("Posts");
    }
  }, [state]);

  if (!fontsLoaded) {
    return <Spinner />;
  } else {
    return (
      <View style={[styles.darkOverlay, styles.wrapper]}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../../../assets/img/Landing/bg1.png")}
          imageStyle={{ opacity: 0.5 }}
        >
          <View style={styles.backBtn}>
            <TouchableOpacity>
              <Ionicons
                name="arrow-back-circle-outline"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.innerWrapper}>
            <View
              style={{
                paddingHorizontal: 20,
                width: 450,
                height: 500,
                // backgroundColor: "#333",
                // borderRadius: 1000,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 50,
                    letterSpacing: 8,
                    color: "#fff",
                    fontFamily: "Inter_700Bold",
                    textAlign: "center",
                    textShadowColor: "rgba(0, 0, 0, 0.95)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10,
                  }}
                >
                  GUARDIAN
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    letterSpacing: 1,
                    color: "#fff",
                    fontFamily: "Inter_300Light",
                    textAlign: "center",
                    textShadowColor: "rgba(0, 0, 0, 0.95)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10,
                  }}
                >
                  Geographic Unified Assistanace and Response to Distress
                  Incidents with Agile Networking
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    paddingVertical: 20,
                    fontSize: 24,
                    letterSpacing: 1,
                    color: "#fff",
                    fontFamily: "Comfortaa_500Medium",
                    textAlign: "center",
                    textShadowColor: "rgba(0, 0, 0, 0.9)",
                    textShadowOffset: { width: -1, height: 2 },
                    textShadowRadius: 10,
                  }}
                >
                  Emergency Response at your Fingertips.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <View style={[styles.btnView, styles.btnMain]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={[styles.btnContent, styles.txtWhite]}>
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.btnView, styles.btnSecondary]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={[styles.btnContent, styles.txtDark]}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    letterSpacing: 1,
                    color: "#fff",
                    fontFamily: "Inter_300Light",
                    textAlign: "center",
                    textShadowColor: "rgba(0, 0, 0, 0.9)",
                    textShadowOffset: { width: -1, height: 2 },
                    textShadowRadius: 10,
                    paddingVertical: 20,
                  }}
                >
                  Computer Aided Dispatch and Civilian Reporting System
                  (CAD/CRS)
                </Text>
              </View>
            </View>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#fff",
                    fontFamily: "Inter_300Light",
                    textAlign: "center",
                  }}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 10,
                  color: "#fff",
                  fontFamily: "Inter_300Light",
                  textAlign: "center",
                  paddingHorizontal: 3,
                }}
              >
                |
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#fff",
                    fontFamily: "Inter_300Light",
                    textAlign: "center",
                  }}
                >
                  Terms & Condition
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 10,
                  color: "#fff",
                  fontFamily: "Inter_300Light",
                  textAlign: "center",
                  paddingHorizontal: 3,
                }}
              >
                |
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#fff",
                    fontFamily: "Inter_300Light",
                    textAlign: "center",
                  }}
                >
                  Contact Us
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 10,
                  color: "#fff",
                  fontFamily: "Inter_300Light",
                  textAlign: "center",
                  marginHorizontal: 20,
                  paddingTop: 5,
                }}
              >
                Developed by Sugbotek Inc, an affiliate of 7Core Communications,
                Inc. | © 2022 All Rights Reserved
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
};

export default Landing;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  innerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    padding: 20,
  },
  align: {
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 5,
  },

  footer: {
    display: "flex",
    position: "absolute",
    bottom: 30,
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  darkOverlay: {
    backgroundColor: "black",
  },
  btnContent: {
    fontSize: 13,
    textAlign: "center",
  },
  btnView: {
    borderColor: "#fff",
    borderRadius: 5,
    height: 38,
    // marginVertical: 20,
    width: 150,
    padding: 10,
    marginHorizontal: 5,
  },
  btnDanger: {
    backgroundColor: "#dc3545",
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
});
