import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

const Alert = ({ type, msg, remove_error, onClose, s }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, setErrorType] = useState("");

  useEffect(() => {
    if (type === "success") {
      setErrorType("Success");
    } else {
      setErrorType("Ooops");
    }
  }, []);

  useEffect(() => {
    if (msg) {
      setShowAlert(true);
    }
  }, [msg]);

  const toogleModal = () => {
    setShowAlert(!showAlert);
    if (type === null) {
      remove_error();
    }
    onClose();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
      onClose();
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    msg !== null && (
      <Modal transparent visible={showAlert}>
        <View style={styles.modalContainer}>
          <View style={styles.modalAlert}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                padding: 10,
                backgroundColor: "#215a75",
                overflow: "hidden",
                borderTopEndRadius: 10,
                borderTopStartRadius: 10,
                height: "30%",
                flexDirection: "row",
              }}
            >
              <EvilIcons name="close-o" size={70} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  letterSpacing: 0.5,
                  fontSize: 30,
                }}
              >
                {errorType}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 18,
                    letterSpacing: 0.5,
                    textAlign: "center",
                  },
                ]}
              >
                {msg}.
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 20,
              }}
            >
              <View style={[styles.btnView, styles.btnMain]}>
                <TouchableOpacity onPress={() => toogleModal()}>
                  <Text style={{ textAlign: "center", color: "#333" }}>
                    Okay
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  );
};

const styles = StyleSheet.create({
  modalAlert: {
    height: "35%",
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
});

export default Alert;
