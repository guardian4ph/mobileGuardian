import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MessageModal = ({
  answeredBy,
  show,
  onClose,
  arrivalMessage,
  responder,
}) => {
  const navigation = useNavigation();
  return (
    <Modal transparent visible={show}>
      <View style={styles.modalContainer}>
        <View style={styles.modalAlert}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 20,
              backgroundColor: "#215a75",
              overflow: "hidden",
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,

              flexDirection: "row",
            }}
          >
            <AntDesign name="message1" size={30} color="#fff" />

            <Text
              style={{
                color: "#fff",
                letterSpacing: 0.5,
                fontSize: 18,
                padding: 10,
              }}
            >
              Message from {answeredBy?.name} {answeredBy?.lname}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 40,
            }}
          >
            <Text
              numberOfLines={7}
              ellipsizeMode="tail"
              style={[styles.messageTxt, styles.txtDark]}
            >
              " {arrivalMessage?.text} "
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              paddingVertical: 5,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("IncidentMessenger", {
                  answeredBy,
                  responder,
                }),
                  onClose();
              }}
              style={[styles.btnView, styles.btnDanger]}
            >
              <Text style={[styles.btnContent, styles.txtDark]}>Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onClose()}
              style={[styles.btnView, styles.btnMain]}
            >
              <Text style={[styles.btnContent, styles.txtDark]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalAlert: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33333350",
    overflow: "hidden",
  },
  inputStyle: {
    width: "90%",
    height: 80,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 3,
    color: "#333",
  },
  btnView: {
    borderColor: "#fff",
    borderRadius: 5,
    height: 50,
    width: 160,
    paddingVertical: 10,
    justifyContent: "center",
    margin: 3,
  },
  btnMain: {
    borderColor: "#215a75",
    borderWidth: 1,
  },
  btnDanger: {
    borderColor: "#215a75",
    borderWidth: 1,
  },
  btnDisable: {
    backgroundColor: "#ab6868",
  },
  btnSecondary: {
    backgroundColor: "#ddd",
  },
  messageTxt: {
    fontSize: 24,
    color: "#333",
    letterSpacing: 0.2,
    marginHorizontal: 20,
    textAlign: "justify",
  },
  txtWhite: {
    color: "#fff",
  },
  txtDark: {
    color: "#215a75",
    paddingHorizontal: 10,
  },
  btnContent: {
    fontSize: 13,
    textAlign: "center",
  },
});

export default MessageModal;
