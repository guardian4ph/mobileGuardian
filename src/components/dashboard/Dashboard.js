import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import React, { useContext, useEffect } from "react";

import {
  useFonts,
  Inter_200ExtraLight,
  Inter_400Regular,
  Inter_300Light,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import { Context as ProfileContext } from "../../context/ProfileContext";
import Spinner from "../layout/Spinner";

const Dashboard = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_200ExtraLight,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const {
    state: { profile },
    getCurrentProfile,
  } = useContext(ProfileContext);
  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (!fontsLoaded) {
    return <Spinner />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backBtn}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={24}
              color="#215a75"
            />
          </TouchableOpacity>
        </View>

        {!profile && (
          <View>
            <View style={[styles.photoContainer, { marginBottom: 20 }]}>
              <View>
                <Image
                  style={styles.profileImage}
                  source={require("../../../assets/img/Profile/profile.jpg")}
                />
              </View>
            </View>
            <Text style={[styles.txtDescription]}>
              Hi Guardian,{" "}
              <Text style={[styles.txtName, styles.txtMain]}>
                {route.params.user.user.name} {route.params.user.user.lname}
              </Text>
            </Text>
          </View>
        )}

        {profile ? (
          <View style={{ alignItems: "center", width: "98%" }}>
            <View>
              <View style={{ flexDirection: "row", width: "80%" }}>
                <Text style={styles.txtDescription}>Lives at </Text>
                <Text style={[styles.txtName, styles.txtDark]}>
                  {profile.completeaddress}
                </Text>
              </View>
              <View style={{ flexDirection: "row", width: "80%" }}>
                <Text style={styles.txtDescription}>Civil status </Text>
                <Text style={[styles.txtName, styles.txtDark]}>
                  {profile.civilstatus}
                </Text>
              </View>
              <View style={{ flexDirection: "row", width: "80%" }}>
                <Text style={styles.txtDescription}>
                  Contact person incase of emergency:{" "}
                </Text>
                <Text style={[styles.txtName, styles.txtDark]}>
                  {profile.emergencyinfo.contactperson}
                </Text>
              </View>
              <View style={{ flexDirection: "row", width: "80%" }}>
                <Text style={styles.txtDescription}>Blood type </Text>
                <Text style={[styles.txtName, styles.txtDark]}>
                  {profile.emergencyinfo.bloodtype}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.txtDescription}>Please</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateProfile")}
            >
              <Text style={[styles.txtName, styles.txtMain]}>
                {" "}
                Create a Profile
              </Text>
            </TouchableOpacity>
            <Text style={styles.txtDescription}> first.</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",

    //  Platform formatting
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    height: "98%",
  },
  photoContainer: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 300,
    backgroundColor: "#215a75",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 300,
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
  txtCompleteName: {
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.1,
    color: "#215a75",
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
  txtName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.1,
  },
  txtDescription: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    letterSpacing: 0.1,
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
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 5,
  },
});
export default Dashboard;
