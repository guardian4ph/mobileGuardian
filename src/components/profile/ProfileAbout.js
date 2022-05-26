import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import { useFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";
import Spinner from "../layout/Spinner";

const ProfileAbout = () => {
  let [fontsLoaded] = useFonts({ Inter_600SemiBold });

  if (!fontsLoaded) {
    return <Spinner />;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ width: "100%", paddingVertical: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="work" size={20} color="#3d6f86" />
            </View>
            <View style={styles.tittleContainer}>
              <Text style={styles.textVaccination}>
                Founder, Director at{" "}
                <Text style={styles.textContent}> SugboTek Inc.</Text>
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="work-outline" size={24} color="#3d6f86" />
            </View>
            <View style={styles.tittleContainer}>
              <Text style={styles.textVaccination}>
                Former <Text>consultant</Text> at
                <Text style={styles.textContent}> Department of Defense</Text>
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="school" size={20} color="#3d6f86" />
            </View>
            <View style={styles.tittleContainer}>
              <Text style={styles.textVaccination}>
                Went to
                <Text style={styles.textContent}>
                  {" "}
                  University of San Jose Recolletos
                </Text>
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="school" size={24} color="#3d6f86" />
            </View>
            <View style={styles.tittleContainer}>
              <Text style={styles.textVaccination}>
                Studied
                <Text style={styles.textContent}>
                  {" "}
                  Bachelor of Science in Computer Science
                </Text>
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="coronavirus" size={24} color="#7498a9" />
            </View>
            <View style={styles.tittleContainer}>
              <Text style={styles.textVaccination}>
                Vaccination
                <Text style={styles.textContent}> Completed</Text>
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconContainer}>
              <FontAwesome name="building" size={20} color="#7498a9" />
            </View>
            <View style={styles.tittleContainer}>
              <Text style={styles.textVaccination}>
                Operation Center{" "}
                <Text style={styles.textContent}> Mandue Command Center</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 2,
    borderWidth: 1,
    borderBottomColor: "#ddd",
  },

  iconContainer: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  tittleContainer: {
    flex: 1,
    marginRight: 5,
    flexDirection: "row",
  },
  textVaccination: {
    color: "#333",
  },
  textContent: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});

export default ProfileAbout;
