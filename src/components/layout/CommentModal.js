import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

const CommentModal = ({ show, onClose, postId, _id, deleteComment }) => {
  const [showAlert, setShowAlert] = useState(false);

  const toogleModal = () => {
    setShowAlert(false);
    onClose();
  };

  useEffect(() => {
    if (show) {
      setShowAlert(true);
    }
  }, [show]);

  return (
    <Modal transparent visible={showAlert}>
      <TouchableOpacity style={styles.modalContainer}>
        <View style={styles.modalAlert}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              backgroundColor: "#215a75",
              overflow: "hidden",
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
              height: "40%",
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "#fff" }}> Comment</Text>
            <TouchableOpacity onPress={() => toogleModal()}>
              <EvilIcons name="close-o" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 3,
            }}
          >
            {/* <View style={[styles.btnView, styles.btnMain]}>
              <TouchableOpacity onPress={() => toogleModal()}>
                <Text style={{ textAlign: "center", color: "#fff" }}>Edit</Text>
              </TouchableOpacity>
            </View> */}
            <View style={[styles.btnView, styles.btnDanger]}>
              <TouchableOpacity onPress={() => deleteComment(postId, _id)}>
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalAlert: {
    width: "40%",
    height: "15%",
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

    width: "90%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",

    marginVertical: 3,
  },
  btnMain: {
    backgroundColor: "#215a75",
  },
  btnDanger: {
    backgroundColor: "#dc3545",
  },
});

export default CommentModal;
