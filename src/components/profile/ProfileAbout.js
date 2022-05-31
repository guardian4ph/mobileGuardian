import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";
import Spinner from "../layout/Spinner";

const ProfileAbout = ({ profile }) => {
  const [currentEducation, setCurrentEducation] = useState([]);
  const [currentEmployment, setCurrentEmployment] = useState([]);
  const [prevEmployment, setPrevEmployment] = useState([]);
  const [prevEducation, setPrevEducation] = useState([]);

  const latestEmployment = prevEmployment.sort(
    (a, b) => new Date(b.to).getTime() - new Date(a.to).getTime()
  )[0];
  const latestEducation = prevEducation.sort(
    (a, b) => new Date(b.to).getTime() - new Date(a.to).getTime()
  )[0];

  useEffect(() => {
    if (profile) {
      setCurrentEducation(
        profile?.education.filter((edu) => edu.current === true)
      );

      setCurrentEmployment(
        profile?.experience.filter((emp) => emp.current === true)
      );

      setPrevEmployment(profile?.experience.filter((prev) => prev.to !== null));
      setPrevEducation(profile?.education.filter((prev) => prev.to !== null));
    }
  }, [profile]);

  let [fontsLoaded] = useFonts({ Inter_600SemiBold });

  if (!fontsLoaded && currentEducation && currentEmployment && prevEmployment) {
    return <Spinner />;
  } else {
    return (
      <View style={styles.container}>
        {profile !== null && (
          <View style={{ width: "100%", paddingVertical: 15 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.iconContainer}>
                <FontAwesome name="map-pin" size={20} color="#3d6f86" />
              </View>
              <View style={styles.tittleContainer}>
                <Text style={styles.textVaccination}>
                  Live in
                  <Text style={styles.textContent}>
                    {" "}
                    {profile?.completeaddress}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="venus-mars" size={20} color="#3d6f86" />
              </View>
              <View style={styles.tittleContainer}>
                <Text style={styles.textVaccination}>
                  Status
                  <Text style={styles.textContent}>
                    {" "}
                    {profile?.civilstatus}
                  </Text>
                </Text>
              </View>
            </View>
            {currentEmployment.length > 0 && (
              <View style={{ flexDirection: "row" }}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="work" size={20} color="#3d6f86" />
                </View>
                <View style={styles.tittleContainer}>
                  <Text style={styles.textVaccination}>
                    {currentEmployment[0]?.title} at
                    <Text style={styles.textContent}>
                      {" "}
                      {currentEmployment[0]?.company}
                    </Text>
                  </Text>
                </View>
              </View>
            )}

            {latestEmployment && (
              <View style={{ flexDirection: "row" }}>
                <View style={styles.iconContainer}>
                  <MaterialIcons
                    name="work-outline"
                    size={24}
                    color="#3d6f86"
                  />
                </View>

                <View style={styles.tittleContainer}>
                  <Text style={styles.textVaccination}>
                    Former {latestEmployment.title} at
                    <Text style={styles.textContent}>
                      {" "}
                      {latestEmployment.company}
                    </Text>
                  </Text>
                </View>
              </View>
            )}

            {currentEducation.length > 0 && (
              <>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.iconContainer}>
                    <FontAwesome5 name="school" size={20} color="#3d6f86" />
                  </View>
                  <View style={styles.tittleContainer}>
                    <Text style={styles.textVaccination}>
                      Currently at
                      <Text style={styles.textContent}>
                        {" "}
                        {currentEducation[0].school}
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
                        {currentEducation[0].fieldofstudy}
                      </Text>
                    </Text>
                  </View>
                </View>
              </>
            )}

            {latestEducation && (
              <>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.iconContainer}>
                    <FontAwesome5 name="school" size={20} color="#3d6f86" />
                  </View>
                  <View style={styles.tittleContainer}>
                    <Text style={styles.textVaccination}>
                      Went to
                      <Text style={styles.textContent}>
                        {" "}
                        {latestEducation.school}
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
                        {latestEducation.fieldofstudy}
                      </Text>
                    </Text>
                  </View>
                </View>
              </>
            )}

            <View style={{ flexDirection: "row" }}>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  name="local-hospital"
                  size={24}
                  color="#3d6f86"
                />
              </View>
              <View style={styles.tittleContainer}>
                <Text style={styles.textVaccination}>
                  Blood type{" "}
                  <Text style={styles.textContent}>
                    {" "}
                    {profile?.emergencyinfo.bloodtype}
                  </Text>{" "}
                  , contact person in case of emergency
                  <Text style={styles.textContent}>
                    {" "}
                    {profile?.emergencyinfo.contactperson}
                  </Text>
                  , contact number{" "}
                  <Text style={styles.textContent}>
                    {profile?.emergencyinfo.contactnumber}
                  </Text>
                </Text>
              </View>
            </View>

            {/* Change to Vaccination Data */}
            <View style={{ flexDirection: "row" }}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="coronavirus" size={24} color="#3d6f86" />
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
                <FontAwesome name="building" size={20} color="#3d6f86" />
              </View>
              <View style={styles.tittleContainer}>
                <Text style={styles.textVaccination}>
                  Operation Center{" "}
                  <Text style={styles.textContent}> Mandue Command Center</Text>
                </Text>
              </View>
            </View>
          </View>
        )}
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
