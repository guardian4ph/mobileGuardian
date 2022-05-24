// import "../../_mockLocation";
import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Map from "../utilitize/Map";
import * as Location from "expo-location";
import DropDownPicker from "react-native-dropdown-picker";
import ProfileImage from "../utilitize/ProfileImage";
import DatePicker from "react-native-modern-datepicker";
import { Context as ProfileContext } from "../../context/ProfileContext";

const CreateProfile = ({ navigation }) => {
  const { createProfile } = useContext(ProfileContext);
  const [mapSize, setMapSize] = useState(true);
  const [open, setOpen] = useState(false);
  const [fileExtension, setfileExtension] = useState();
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "LGBTQ", value: "LGBTQ" },
  ]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusItems, setStatusItems] = useState([
    { label: "Single", value: "Single" },
    { label: "Married", value: "Married" },
    { label: "Widowed", value: "Widowed" },
    { label: "Separated", value: "Separated" },
  ]);
  const [bloodOpen, setBloodOpen] = useState(false);
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

  const [location, setLocation] = useState(null);

  // Date Picker
  const [showDate, setshowDate] = useState(false);
  //  <---------------- Forms --------------------------->
  // Get file Path from Child Component
  const [filePath, setFilePath] = useState("");

  // Get name address from Map Component

  const [nameAddress, setNameAddress] = useState({
    completeaddress: "",
    city: "",
    area: "",
    state: "",
    lat: "",
    lng: "",
  });

  const [gender, setGender] = useState("");
  const [civilstatus, setCivilStatus] = useState("");
  const [birthday, setBirthday] = useState("");
  const [contactperson, setContactPerson] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [bloodtype, setBloodType] = useState("");

  const showDatePicker = () => {
    if (showDate === true) {
      setshowDate(false);

      return;
    }
    setshowDate(true);
  };

  // Map size
  const toggleMap = () => {
    if (mapSize === true) {
      setMapSize(false);
      return;
    }
    setMapSize(true);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (filePath) {
      setfileExtension(filePath.uri.substr(filePath.uri.length - 4));
    }
  }, [filePath]);

  const payload = new FormData();

  payload.append("gender", gender);
  payload.append("civilstatus", civilstatus);
  payload.append("birthday", birthday);
  payload.append("contactperson", contactperson);
  payload.append("contactnumber", contactnumber);
  payload.append("bloodtype", bloodtype);
  payload.append("profilepic", {
    name: `_profile` + fileExtension,
    uri: filePath.uri,
    type: "image/jpg",
  });
  payload.append("completeaddress", nameAddress.completeaddress);
  payload.append("city", nameAddress.city);
  payload.append("area", nameAddress.area);
  payload.append("state", nameAddress.state);
  payload.append("lat", nameAddress.lat);
  payload.append("lng", nameAddress.lng);

  const onSubmit = async () => {
    try {
      createProfile(payload);
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors.msg);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
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
          <FlatList
            ListHeaderComponent={
              <View style={{ alignItems: "center" }}>
                <View style={styles.componentsContainer}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingTop: 20,
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
                    value={nameAddress.completeaddress}
                    autoCorrect={false}
                    placeholderTextColor="#333"
                  ></TextInput>
                  {/* Map Here ---------------------------------- */}
                  {location && (
                    <View
                      style={
                        mapSize ? styles.mapContainer : styles.mapContainerLarge
                      }
                    >
                      <View
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          zIndex: 10,
                        }}
                      >
                        <TouchableOpacity onPress={toggleMap}>
                          <MaterialIcons
                            name="fullscreen"
                            size={30}
                            color="#215a75"
                          />
                        </TouchableOpacity>
                      </View>

                      <Map
                        location={location}
                        setNameAddress={setNameAddress}
                      />
                    </View>
                  )}
                  <DropDownPicker
                    style={{
                      borderColor: "#ddd",
                      marginVertical: 5,
                    }}
                    zIndex={3000}
                    zIndexInverse={1000}
                    placeholder="Choose gender"
                    open={open}
                    value={gender}
                    items={genderItems}
                    setOpen={setOpen}
                    setValue={setGender}
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
                    value={civilstatus}
                    items={statusItems}
                    setOpen={setStatusOpen}
                    setValue={setCivilStatus}
                    setItems={setStatusItems}
                  />

                  {/* DATE HERE                        -------- > */}
                  <TouchableOpacity
                    onPress={() => showDatePicker()}
                    style={[
                      styles.btnView,
                      {
                        backgroundColor: "#215a75",
                        flexDirection: "row",
                        height: 45,
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Ionicons
                      style={{ textAlign: "right" }}
                      name="calendar"
                      size={24}
                      color="#fff"
                    />
                    <Text style={styles.txtWhite}>
                      ( Birthday {moment(birthday).format("MM-DD-YYYY")} )
                    </Text>
                  </TouchableOpacity>
                  {showDate && (
                    <DatePicker
                      options={{
                        // backgroundColor: "#090C08",
                        textHeaderColor: "#215a75",
                        // textDefaultColor: "#F6E7C1",
                        selectedTextColor: "#215a75",
                        // mainColor: "#F4722B",
                        // textSecondaryColor: "#D6C7A1",
                        // borderColor: "rgba(122, 146, 165, 0.1)",
                      }}
                      date={birthday}
                      onDateChange={(date) => setBirthday(date)}
                      mode="calendar"
                    />
                  )}

                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Contact Person"
                    value={contactperson}
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholderTextColor="#333"
                    onChangeText={setContactPerson}
                  ></TextInput>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="09XXXXXXXXX"
                    value={contactnumber}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#333"
                    keyboardType="phone-pad"
                    onChangeText={setContactNumber}
                  ></TextInput>
                  <DropDownPicker
                    style={{ borderColor: "#ddd", marginTop: 5, zIndex: 5 }}
                    placeholder="Choose blood type"
                    open={bloodOpen}
                    value={bloodtype}
                    items={bloodItems}
                    setOpen={setBloodOpen}
                    setValue={setBloodType}
                    setItems={setBloodItems}
                  />
                </View>
              </View>
            }
          />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity
              style={[styles.btnView, styles.btnMain]}
              onPress={() => onSubmit()}
            >
              <Text style={[styles.btnContent, styles.txtWhite]}>
                Create Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#215a75",

    //  Platform formatting
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    alignItems: "center",
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    height: "98%",
  },
  componentsContainer: {
    width: "90%",
  },
  mapContainer: {
    position: "relative",
    height: 200,
    width: "100%",
  },
  mapContainerLarge: {
    position: "relative",
    height: 400,
    width: "100%",
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
