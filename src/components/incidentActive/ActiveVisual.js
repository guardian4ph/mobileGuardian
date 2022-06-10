import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Context as ResponderConText } from "../../context/ResponderContext";

const ActiveVisual = ({ answeredBy, incident }) => {
  const {
    state: { responder },
  } = useContext(ResponderConText);
  const [onLoadImage, setLoadImage] = useState(false);
  const [responderProfile, setResponderProfile] = useState("");
  const imageLoading = () => {
    setLoadImage(true);
  };

  useEffect(() => {
    if (responder) {
      setResponderProfile(responder[0]);
    }
  }, [responder]);

  console.log("Responder Profile", responderProfile.profilee);
  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        {responder !== null ? (
          <>
            <Image
              style={styles.profileImage}
              source={
                onLoadImage
                  ? {
                      uri: `http://10.128.50.114:5000/${responderProfile.profilee.profilepic}`,
                    }
                  : require("../../../assets/IncidentImages/Dispatch.png")
              }
              onLoad={() => imageLoading()}
            />
          </>
        ) : (
          <Image
            style={styles.profileImage}
            source={require("../../../assets/IncidentImages/Dispatch.png")}
          />
        )}
        {incident.type === "Covid" ? (
          <View style={{ position: "absolute", right: 0, bottom: 0 }}>
            <Image
              style={styles.opcenImage}
              source={require("../../../assets/icons/incidentType/Covid-res.png")}
            />
          </View>
        ) : incident.type === "Fire" ? (
          <View style={{ position: "absolute", right: 0, bottom: 0 }}>
            <Image
              style={styles.opcenImage}
              source={require("../../../assets/icons/incidentType/Fire.png")}
            />
          </View>
        ) : incident.type === "Medical" ? (
          <View style={{ position: "absolute", right: 0, bottom: 0 }}>
            <Image
              style={styles.opcenImage}
              source={require("../../../assets/icons/incidentType/Medical.png")}
            />
          </View>
        ) : incident.type === "Crime" ? (
          <View style={{ position: "absolute", right: 0, bottom: 0 }}>
            <Image
              style={styles.opcenImage}
              source={require("../../../assets/icons/incidentType/Police.png")}
            />
          </View>
        ) : (
          <View style={{ position: "absolute", right: 0, bottom: 0 }}>
            <Image
              style={styles.opcenImage}
              source={require("../../../assets/icons/incidentType/General.png")}
            />
          </View>
        )}
      </View>

      <Text
        style={{
          paddingTop: 10,
          fontSize: 20,
          letterSpacing: 0.5,
          fontWeight: "500",
          color: "#333",
        }}
      >
        {answeredBy.name} {answeredBy.Lname}
      </Text>
      <Text style={{ color: "#dc3545", letterSpacing: 0.5, paddingTop: 5 }}>
        DISPATCH
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 2,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 300,
    marginTop: 20,
  },
  opcenImage: {
    width: 60,
    height: 60,
    borderRadius: 300,
    marginHorizontal: 10,
  },
});
export default ActiveVisual;
