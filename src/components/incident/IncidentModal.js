import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Context as ProfileContext } from "../../context/ProfileContext";
import { Context as AuthContext } from "../../context/AuthContext";

const IncidentModal = () => {
  const navigation = useNavigation();
  const {
    state: { profile },
    getCurrentProfile,
  } = useContext(ProfileContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {!profile ? (
        <View style={{ alignItems: "center" }}>
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
              {user?.name} {user?.lname}
            </Text>
          </Text>
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
            <Text style={styles.txtDescription}>
              {" "}
              to start sending reports.
            </Text>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.backBtn}>
            <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <Ionicons
                name="arrow-back-circle-outline"
                size={24}
                color="#333"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <View>
              <View style={[styles.iconContainer, styles.borderTopLeft]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("IncidentCreate", {
                      type: "Medical",
                    })
                  }
                >
                  <View>
                    <Image
                      style={[styles.imgIcon, styles.shadow]}
                      source={require("../../../assets/icons/incident/Medical.png")}
                    />
                  </View>

                  <Text style={[styles.txtWhite, styles.txtPaddingTop]}>
                    Ambulance
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.iconContainer, styles.borderBottomLeft]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("IncidentCreate", {
                      type: "Fire",
                    })
                  }
                >
                  <View>
                    <Image
                      style={[styles.imgIcon, styles.shadow]}
                      source={require("../../../assets/icons/incident/Fire.png")}
                    />
                  </View>

                  <Text style={[styles.txtWhite, styles.txtPaddingTop]}>
                    Fire
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={[styles.iconContainer, styles.borderTopRight]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("IncidentCreate", {
                      type: "Crime",
                    })
                  }
                >
                  <View>
                    <Image
                      style={[styles.imgIcon, styles.shadow]}
                      source={require("../../../assets/icons/incident/Crime.png")}
                    />
                  </View>

                  <Text style={[styles.txtWhite, styles.txtPaddingTop]}>
                    Police
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.iconContainer, styles.borderBottomRight]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("IncidentCreate", {
                      type: "General",
                    })
                  }
                >
                  <View>
                    <Image
                      style={[styles.imgIcon, styles.shadow]}
                      source={require("../../../assets/icons/incident/Call.png")}
                    />
                  </View>

                  <Text style={[styles.txtWhite, styles.txtPaddingTop]}>
                    General
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default IncidentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    // alignItems: "center",
    // justifyContent: "center",
    //  Platform formatting
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  txtWhite: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  txtPaddingTop: {
    paddingTop: 8,
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
  txtMain: {
    color: "#215a75",
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
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 5,
  },

  imageContainer: {
    display: "flex",
    flexDirection: "row",
    width: 320,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 4,
    borderColor: "#fff",
  },
  iconContainer: {
    width: 160,
    height: 160,
    backgroundColor: "#215a75",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },

  imgIcon: {
    width: 80,
    height: 60,
    resizeMode: "contain",
  },

  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    }),
  },

  borderTopLeft: {
    borderTopLeftRadius: 30,
  },
  borderTopRight: {
    borderTopRightRadius: 30,
  },
  borderBottomLeft: {
    borderBottomLeftRadius: 30,
  },
  borderBottomRight: {
    borderBottomRightRadius: 30,
  },
});
