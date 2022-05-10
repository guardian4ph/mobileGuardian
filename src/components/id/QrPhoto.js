import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
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
import QRCode from "react-native-qrcode-svg";

const QrPhoto = (props) => {
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  });

  let logo = require("../../../assets/logos/mandaue.png");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => props.navigation.navigate("ID")}>
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
          <View style={styles.QRContainer}>
            <TouchableOpacity onPress={() => props.navigation.navigate("ID")}>
              <QRCode
                size={350}
                value="https://guardian.ph"
                // logoSize={50}
                // logo={logo}
                // logoBackgroundColor="transparent"
              />
            </TouchableOpacity>
            <Text style={{ color: "#aaa", paddingTop: 12 }}>BACK TO ID</Text>
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
          <View style={styles.validityContainer}>
            <Text style={{ color: "#fff" }}>VALID UNTIL REVOKED</Text>
          </View>
        </View>
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
  backBtn: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 5,
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
  QRContainer: {
    paddingTop: 75,
    width: "100%",
    height: "62%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 2,
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
  alignDetails: {
    justifyContent: "center",
    alignItems: "center",
  },
  textVaccination: {
    fontSize: 18,
    letterSpacing: 1,
    color: "#fff",
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  operationContainer: {
    width: "100%",
    height: "11%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 2,
  },
  operationAddress: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
  profileImage: {
    width: 400,
    height: 400,
    borderRadius: 100,

    borderColor: "#215a75",
    borderWidth: 5,
  },
});

export default QrPhoto;
