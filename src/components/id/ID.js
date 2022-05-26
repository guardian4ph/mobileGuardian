import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  useFonts,
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import Spinner from "../layout/Spinner";

const ID = (props) => {
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_500Medium,
  });
  if (!fontsLoaded) {
    return <Spinner />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backBtn}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Posts")}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color="#215a75"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.idContainer}>
          <View style={styles.idHolder}></View>
          <View style={styles.componentsContainer}>
            <View style={styles.photoContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("QrPhoto")}
              >
                <Image
                  style={styles.profileImage}
                  source={require("../../../assets/img/Profile/profile.jpg")}
                />
              </TouchableOpacity>
              <Text style={{ color: "#aaa", paddingTop: 12 }}>
                TAP TO SHOW QR CODE
              </Text>
            </View>
            <View style={styles.nameContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textName}>Luis Ben Cluade </Text>
                <Text style={styles.textName}> Dedicatoria</Text>
              </View>
              <View>
                <Text style={{ color: "#aaa", paddingTop: 10 }}>
                  COMPLETE NAME
                </Text>
              </View>
            </View>

            <View style={styles.vaccinationContainer}>
              <TouchableOpacity>
                <Text style={styles.textVaccination}>
                  NO COVID VACCINATION DATA
                </Text>
                <Text style={styles.textVaccination}>(Tap and fill-up)</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.operationAddress}>
              <View style={styles.alignDetails}>
                <Text numberOfLines={1} style={styles.textAddress}>
                  1797 Sitio San Miguel, Apas, Cebu City, Cebu
                </Text>

                <Text style={{ color: "#aaa" }}>ADDRESS</Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={[styles.alignDetails, { paddingTop: 10 }]}>
                <Text style={styles.semiBold}>Emergency Dispatch Operator</Text>
                <Text>at</Text>
                <Text style={styles.textAddress}>
                  GUARDIAN Command and Control
                </Text>
                <Text style={{ color: "#aaa" }}>EMPLOYMENT</Text>
              </View>
            </View>
            <View style={styles.operationContainer}>
              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <View style={styles.shadow}>
                  <Image
                    style={styles.postLogo}
                    source={require("../../../assets/logos/mandaue.png")}
                  />
                </View>

                <Text style={styles.semiBold}>
                  Bantay Mandaue Command Center
                </Text>
              </View>
              <View>
                <Text style={{ color: "#aaa" }}>OPERATION CENTER</Text>
              </View>
            </View>
            <View style={styles.validityContainer}>
              <Text style={{ color: "#fff" }}>VALID UNTIL REVOKED</Text>
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
    position: "relative",
    backgroundColor: "#215a75",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  idContainer: {
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
  componentsContainer: {
    width: "98%",
    height: "99%",
  },

  idHolder: {
    position: "absolute",
    top: 18,
    width: "20%",
    height: 15,
    backgroundColor: "#555",
    zIndex: 10,
    borderRadius: 10,
  },
  photoContainer: {
    paddingTop: 75,
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 2,
  },
  validityContainer: {
    width: "100%",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28a745",
    marginBottom: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backBtn: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 5,
  },
  nameContainer: {
    // flexDirection: "row",
    width: "100%",
    height: "12%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 2,
  },
  textName: {
    fontSize: 25,
    letterSpacing: 1,
    color: "#333",
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  vaccinationContainer: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 2,
    backgroundColor: "#dc3545",
  },
  textVaccination: {
    fontSize: 18,
    letterSpacing: 1,
    color: "#fff",
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  detailsContainer: {
    width: "100%",
    height: "12.8%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 2,
  },
  alignDetails: {
    justifyContent: "center",
    alignItems: "center",
  },
  textAddress: {
    fontSize: 14,
    paddingBottom: 3,
    color: "#333",
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },

  semiBold: {
    fontSize: 16,
    paddingBottom: 3,
    color: "#333",
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  operationAddress: {
    width: "100%",
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 2,
  },
  operationContainer: {
    width: "100%",
    height: "11%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 2,
  },
  profileImage: {
    width: 240,
    height: 240,
    borderRadius: 300,
    borderColor: "#215a75",
    borderWidth: 5,
  },
  postLogo: {
    width: 50,
    height: 50,

    borderRadius: 50,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#202020",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default ID;
