import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Context as AnnouncementContext } from "../../context/AnnouncementContext";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const Annoucement = () => {
  const { state, getAnnouncement } = useContext(AnnouncementContext);
  useEffect(() => {
    getAnnouncement();
  }, []);

  let today = moment().startOf("day").add(1, "day");

  const [modalVisible, setModalVisible] = useState(true);

  let activeAnnoucement = state?.announcements.filter((el) => {
    return moment(el.dateTo) >= today && moment(el.dateFrom) <= today;
  });

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const tick = () => setIndex((i) => i + 1);

    const id = setInterval(tick, 8000);
    return () => clearInterval(id);
  }, []);
  if (state.announcements.length > 0) {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {state?.announcements && (
                <Image
                  style={{ flex: 1, resizeMode: "contain" }}
                  source={{
                    uri: `http://10.128.50.114:5000/${
                      activeAnnoucement[index % activeAnnoucement?.length]
                        ?.articleImage
                    }`,
                  }}
                />
              )}
              {/* <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity> */}
              <View style={styles.backBtn}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Ionicons
                    name="arrow-back-circle-outline"
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity> */}
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  centeredView: {
    position: "relative",
    flex: 1,

    backgroundColor: "#215a75",
  },
  modalView: {
    width: "100%",
    height: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  backBtn: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 5,
  },
});

export default Annoucement;
