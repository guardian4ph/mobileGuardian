import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { AntDesign } from "@expo/vector-icons";

const ProfileActions = ({ profile }) => {
  let [fontsLoaded] = useFonts({ Inter_400Regular });

  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <View style={{ width: "30%" }}></View>
          <View
            style={{
              flexDirection: "row",
              width: "70%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {profile !== null ? (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfile")}
                >
                  <Text style={styles.textName}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddEducation")}
                >
                  <Text style={styles.textName}>Education</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddExperience")}
                >
                  <Text style={styles.textName}>Jobs/Trainings</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateProfile")}
              >
                <Text style={styles.textName}>Create Profile</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
              <Text>
                <AntDesign name="setting" size={24} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: 38,
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

  textName: {
    fontSize: 12,

    color: "#fff",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    paddingHorizontal: 5,
  },
});
export default ProfileActions;
