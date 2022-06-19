import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import DatePicker from "react-native-modern-datepicker";
import { Context as ProfileContext } from "../../context/ProfileContext";
import Alert from "../layout/Alert";

const AddExperience = ({ navigation }) => {
  const { state, addExperience } = useContext(ProfileContext);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showDateFrom, setshowDateFrom] = useState(false);
  const [showDateTo, setshowDateTo] = useState(false);

  const showDatePickerFrom = () => {
    if (showDateFrom === true) {
      setshowDateFrom(false);

      return;
    }
    setshowDateFrom(true);
  };
  const showDatePickerTo = () => {
    if (showDateTo === true) {
      setshowDateTo(false);

      return;
    }
    setshowDateTo(true);
  };

  const clearForm = () => {
    setTitle("");
    setCompany("");
    setLocation("");
    setFrom("");
    setTo("");
    setCurrent(false);
    setDescription("");
  };

  const onSubmit = async () => {
    try {
      addExperience({
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      });
      clearForm();
      setShowAlert(true);
    } catch (err) {
      console.log(`Add Education Error ${err}`);
    }
  };

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
      {showAlert ? (
        <Alert
          msg={"Experience added"}
          type={"success"}
          onClose={() => setShowAlert(false)}
        />
      ) : null}
      <KeyboardAvoidingView
        style={styles.subContainer}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View style={styles.componentsContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <FontAwesome name="black-tie" size={24} color="#215a75" />
            <Text style={styles.txtMain}> Job Experience</Text>
          </View>
          <Text style={[styles.txtDark, styles.fontSmall]}>
            Add your job experiences, trainings and certifications
          </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Training or Job Title"
            value={title}
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setTitle}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Company/ Training Host"
            value={company}
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setCompany}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Address/Location"
            value={location}
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setLocation}
          ></TextInput>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={[styles.inputStyle, { width: "85%" }]}
              placeholder="From date"
              value={from}
              autoCorrect={false}
              placeholderTextColor="#333"
            ></TextInput>
            <TouchableOpacity
              onPress={() => showDatePickerFrom()}
              style={[
                styles.btnView,
                {
                  backgroundColor: "#215a75",
                  width: 50,
                  height: 40,
                  alignItems: "center",
                },
              ]}
            >
              <Ionicons
                style={{ textAlign: "right" }}
                name="calendar"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {showDateFrom === true ? (
            <DatePicker
              options={{
                textHeaderColor: "#215a75",
                selectedTextColor: "#215a75",
              }}
              date={from}
              onDateChange={(date) => setFrom(date)}
              mode="calendar"
            />
          ) : null}

          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={current}
              onValueChange={setCurrent}
              color={current ? "#215a75" : undefined}
            />
            <Text style={styles.paragraph}> Current </Text>
          </View>

          {current === false ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={[styles.inputStyle, { width: "85%" }]}
                placeholder="To date"
                value={to}
                autoCorrect={false}
                placeholderTextColor="#333"
                onChangeText={setTo}
              ></TextInput>
              <TouchableOpacity
                onPress={() => showDatePickerTo()}
                style={[
                  styles.btnView,
                  {
                    backgroundColor: "#215a75",
                    width: 50,
                    height: 40,
                    alignItems: "center",
                  },
                ]}
              >
                <Ionicons
                  style={{ textAlign: "right" }}
                  name="calendar"
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          ) : null}

          {showDateTo === true ? (
            <DatePicker
              options={{
                textHeaderColor: "#215a75",
                selectedTextColor: "#215a75",
              }}
              date={to}
              onDateChange={(date) => setTo(date)}
              mode="calendar"
            />
          ) : null}

          <TextInput
            style={[styles.inputStyle, { height: 70 }]}
            numberOfLines={4}
            multiline
            placeholder="Description"
            value={description}
            autoCapitalize="sentences"
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setDescription}
          ></TextInput>

          <TouchableOpacity
            style={[styles.btnView, styles.btnMain, { marginBottom: 20 }]}
            onPress={() => onSubmit()}
          >
            <Text style={[styles.btnContent, styles.txtWhite]}>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",

    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  componentsContainer: {
    width: "90%",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 5,
  },
  inputStyle: {
    height: 40,

    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 3,
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

export default AddExperience;
