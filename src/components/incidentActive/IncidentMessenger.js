import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Keyboard,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import IncidentMessages from "./IncidentMessages";
import socket from "../socket/Socket";
import { Ionicons } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";

const IncidentMessenger = ({ route }) => {
  const { state: user } = useContext(AuthContext);
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState("");

  const onSubmit = async () => {
    const sendMessage = newMessage.trim();
    if (sendMessage.length > 0) {
      const message = {
        incidentId: route.params.answeredBy.incidentId,
        sender: user.user._id,
        text: sendMessage,
      };

      const receiverId = route.params.answeredBy.dispatcher_userId;

      try {
        const res = await axios.post(
          "http://10.128.50.114:5000/api/incident_msg",
          message
        );

        setMessages([...messages, res.data]);
        setNewMessage("");

        socket.emit("sendMessage", {
          incidentId: route.params.answeredBy.incidentId,
          senderId: user.user._id,
          receiverId,
          text: sendMessage,
        });
      } catch (err) {
        console.log("Error Sending msg");
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    socket.on("getMessage", (data) => {
      if (isMounted) {
        if (data.senderId === route.params.answeredBy.dispatcher_userId) {
          setArrivalMessage({
            incidentId: data.IncidentId,
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
          });
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    const getIncidentMessages = async () => {
      try {
        const res = await axios.get(
          `http://10.128.50.114:5000/api/incident_msg/${route.params.answeredBy.incidentId}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log("error get messages");
      }
    };

    getIncidentMessages();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "#3d6f86",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View
          style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: "#fff", marginLeft: 10 }}>
            {route.params.answeredBy.name} {route.params.answeredBy.lname}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            width: "15%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <MaterialIcons name="call" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="videocam" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.subContainer}
      >
        <View
          style={{
            height: "90%",
            backgroundColor: "#fff",
            borderColor: "#ddd",
            borderWidth: 1,
            overflow: "scroll",
          }}
        >
          {/* {messages?.map((m) => (
            <View key={m.createdAt}>
              <IncidentMessages
                key={m.createdAt}
                message={m}
                own={m.sender !== route.params.answeredBy.dispatcher_userId}
                incidentId={m.incidentId}
              />
            </View>
          ))}
          Messsages Here */}
          <FlatList
            ref={(it) => (scrollRef.current = it)}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: false })
            }
            data={messages}
            renderItem={({ item }) => (
              <IncidentMessages
                message={item}
                own={item.sender !== route.params.answeredBy.dispatcher_userId}
                responderProfilePic={
                  route.params.responder[0].profilee.profilepic
                }
              />
            )}
            // key={messages.createdAt}
            keyExtractor={(item, index) => String(index)}
            // keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={{ height: "10%", backgroundColor: "#fff" }}>
          <View style={styles.inner}>
            <TextInput
              placeholder="Input message here"
              placeholderTextColor="#333"
              multiline
              style={styles.inputStyle}
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <View
              style={{
                width: "15%",

                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  onSubmit(), Keyboard.dismiss;
                }}
              >
                <MaterialIcons name="send" size={24} color="#215a75" />
              </TouchableOpacity>
            </View>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    borderBottomColor: "#ddd",
    borderWidth: 1,
  },
  inputStyle: {
    width: "75%",
    overflow: "hidden",
  },

  inner: {
    flex: 1,
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default IncidentMessenger;
