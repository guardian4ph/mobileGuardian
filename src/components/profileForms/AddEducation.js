import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Context as ProfileContext } from "../../context/ProfileContext";
import Checkbox from "expo-checkbox";
import Alert from "../layout/Alert";

const AddEducation = ({ navigation }) => {
  const { state, addEducation } = useContext(ProfileContext);

  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldofstudy, setFieldofstudy] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [showDateFrom, setshowDateFrom] = useState(false);
  const [showDateTo, setshowDateTo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
    setSchool("");
    setDegree("");
    setFieldofstudy("");
    setFrom("");
    setTo("");
    setCurrent(false);
    setDescription("");
  };
  const onSubmit = async () => {
    try {
      addEducation({
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      });
      clearForm();
      setShowAlert(true);
    } catch (err) {
      console.log(`Add Education Error ${err}`);
      <Alert msg={"Something went wrong"} type={"danger"} />;
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
          msg={"Education added"}
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
            <Ionicons name="school-outline" size={24} color="#215a75" />

            <Text style={styles.txtMain}> Education</Text>
          </View>
          <Text style={[styles.txtDark, styles.fontSmall]}>
            Add school bootcamp that you attended
          </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="School or bootcamp"
            value={school}
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setSchool}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Degree/ Certificate"
            value={degree}
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setDegree}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Field of study"
            value={fieldofstudy}
            autoCorrect={false}
            placeholderTextColor="#333"
            onChangeText={setFieldofstudy}
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
            onPress={() => {
              onSubmit();
            }}
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

export default AddEducation;
