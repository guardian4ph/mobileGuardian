// import "../../_mockLocation";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Map from "../utilitize/Map";
import * as Location from "expo-location";
import DropDownPicker from "react-native-dropdown-picker";
import ProfileImage from "../utilitize/ProfileImage";

const options = {
  title: "Select Image",
  type: " library",
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: "mixed",
    includeBase64: false,
  },
};

const CreateProfile = ({ navigation, profileImage }) => {
  const [open, setOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "LGBTQ", value: "LGBTQ" },
  ]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(null);
  const [statusItems, setStatusItems] = useState([
    { label: "Single", value: "Single" },
    { label: "Married", value: "Married" },
    { label: "Widowed", value: "Widowed" },
    { label: "Separated", value: "Separated" },
  ]);
  const [bloodOpen, setBloodOpen] = useState(false);
  const [bloodValue, setBloodValue] = useState(null);
  const [bloodItems, setBloodItems] = useState([
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ]);

  // Location Declaration

  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      setLocation(location);
    })();
  }, []);

  // Get file Path from Child Component
  const [filePath, setFilePath] = useState("");

  console.log("FilePath", filePath);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={24}
            color="#215a75"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        {/* {err ? <Text> {`Error ${err}`}</Text> : null} */}
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
            <Text style={styles.txtMain}>Create Your Profile</Text>
          </View>

          {/* Photo Profile */}
          <ProfileImage setFilePath={setFilePath} />

          <TextInput
            style={styles.inputStyle}
            placeholder="Address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#333"
          ></TextInput>
          {location && <Map location={location} />}

          <DropDownPicker
            style={{
              borderColor: "#ddd",
              marginVertical: 5,
            }}
            zIndex={3000}
            zIndexInverse={1000}
            placeholder="Choose gender"
            open={open}
            value={genderValue}
            items={genderItems}
            setOpen={setOpen}
            setValue={setGenderValue}
            setItems={setGenderItems}
          />

          <DropDownPicker
            style={{
              borderColor: "#ddd",
              marginVertical: 5,
            }}
            zIndex={2000}
            zIndexInverse={2000}
            placeholder="Choose civil status"
            open={statusOpen}
            value={statusValue}
            items={statusItems}
            setOpen={setStatusOpen}
            setValue={setStatusValue}
            setItems={setStatusItems}
          />

          <TextInput
            style={styles.inputStyle}
            placeholder="Birthday"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#333"
          ></TextInput>

          <TextInput
            style={styles.inputStyle}
            placeholder="Contact Person"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholderTextColor="#333"
          ></TextInput>

          <TextInput
            style={styles.inputStyle}
            placeholder="09XXXXXXXXX"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#333"
          ></TextInput>

          <DropDownPicker
            style={{ borderColor: "#ddd", marginTop: 5, zIndex: 5 }}
            placeholder="Choose blood type"
            open={bloodOpen}
            value={bloodValue}
            items={bloodItems}
            setOpen={setBloodOpen}
            setValue={setBloodValue}
            setItems={setBloodItems}
          />

          <TouchableOpacity style={[styles.btnView, styles.btnMain]}>
            <Text style={[styles.btnContent, styles.txtWhite]}>
              CreateProfile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#215a75",
    // alignItems: "center",
    // justifyContent: "center",
    //  Platform formatting
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "98%",
    height: "98%",
    justifyContent: "center",
    alignItems: "center",
  },
  componentsContainer: {
    width: "90%",
  },

  backBtn: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 5,
  },
  inputStyle: {
    height: 40,
    width: "100%",
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 8,
    zIndex: -10,
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

export default CreateProfile;
