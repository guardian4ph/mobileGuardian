import { View, Text, Modal, StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CancelModal = ({
  socket,
  show,
  incident,
  responder,
  onClose,
  incidentCancelled,
}) => {
  const [reason, setReason] = useState("");
  const [disable, setDisable] = useState(true);
  const [dispatcher, setDispatcher] = useState("");

  useEffect(() => {
    if (responder) {
      setDispatcher(responder[0]?.user._id);
    }
  }, [responder]);

  useEffect(() => {
    if (reason !== "" || reason !== null) {
      setDisable(false);
    }
  }, [reason]);

  console.log("Cancel Modal Responder", dispatcher);

  const onSubmit = async () => {
    try {
      const incidentId = incident._id;
      const reportedby_userId = incident.user;
      incidentCancelled({ incidentId, reportedby_userId, reason });

      socket.emit("sendCancelledIncident", {
        receiverId: dispatcher,
        senderId: incident.user,
        reason: reason,
      });
      //   onClose();
    } catch (error) {
      console.log("Error cancelling report", "danger");
    }
  };

  return (
    <Modal transparent visible={show}>
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

              flexDirection: "row",
            }}
          >
            <EvilIcons name="close-o" size={30} color="#fff" />
            <Text
              style={{
                color: "#fff",
                letterSpacing: 0.5,
                fontSize: 18,
              }}
            >
              {"  "}Are you sure you want to cancel?
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <TextInput
              placeholder="Reason"
              style={styles.inputStyle}
              placeholderTextColor="#333"
              multiline
              onChangeText={setReason}
            ></TextInput>
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
              onPress={() => onSubmit()}
              style={
                disable
                  ? [styles.btnView, styles.btnDisable]
                  : [styles.btnView, styles.btnDanger]
              }
              disabled={disable}
            >
              <Text style={[styles.btnContent, styles.txtWhite]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onClose()}
              style={[styles.btnView, styles.btnMain]}
            >
              <Text style={[styles.btnContent, styles.txtWhite]}>No</Text>
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
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 3,
    color: "#333",
  },
  btnView: {
    borderColor: "#fff",
    borderRadius: 5,
    height: 38,
    width: 160,
    paddingVertical: 10,
    margin: 3,
  },
  btnMain: {
    backgroundColor: "#28a745",
  },
  btnDanger: {
    backgroundColor: "#dc3545",
  },
  btnDisable: {
    backgroundColor: "#ab6868",
  },
  btnSecondary: {
    backgroundColor: "#ddd",
  },
  txtWhite: {
    color: "#fff",
  },
  btnContent: {
    fontSize: 13,
    textAlign: "center",
  },
});

export default CancelModal;
