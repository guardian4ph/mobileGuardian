import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Map from "../utilitize/Map";
import * as Location from "expo-location";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as IncidentConText } from "../../context/IncidentContext";
import moment from "moment";
import socket from "../socket/Socket";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";

const IncidentCreate = ({ route }) => {
  const {
    state: { createIncident, incident },
    submitIncident,
    missedCall,
  } = useContext(IncidentConText);
  const {
    state: { user },
  } = useContext(AuthContext);

  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [mapSize, setMapSize] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [notSupported, setNotSupported] = useState(false);
  const [engage, setEngage] = useState(false);

  const [nameAddress, setNameAddress] = useState({
    completeaddress: "",
    city: "",
    area: "",
    state: "",
    lat: "",
    lng: "",
  });
  const [response, setResponse] = useState("");
  const [onlineDispatchers, setOnlineDispatchers] = useState([]);

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
        console.log(errorMsg);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    socket.on("getDispatcher", (data) => {
      setOnlineDispatchers(data.filter((res) => res.user !== user._id));
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    socket.emit("online_Dispatchers", { data: "Request online dispatchers" });
  }, []);

  const reportedDate = moment.utc();

  const onSubmit = async () => {
    if (
      // Supported City
      nameAddress.completeaddress.includes("Mandaue")
      //  ||      scompleteaddress.includes("Cebu City")
    ) {
      if (onlineDispatchers.length > 0) {
        submitIncident({
          user: user._id,
          name: user.name,
          lname: user.lname,
          number: user.number,
          type: route.params.type,
          scompleteaddress: nameAddress.completeaddress,
          scity: nameAddress.city,
          sstate: nameAddress.state,
          sarea: nameAddress.area,
          slat: nameAddress.lat,
          slng: nameAddress.lng,
          status: "ACTIVE",
          reportedDate,
        });

        socket.emit("sendIncident", {
          user: user._id,
          name: user.name,
          lname: user.lname,
          number: user.number,
          type: route.params.type,
          scompleteaddress: nameAddress.completeaddress,
          scity: nameAddress.city,
          sstate: nameAddress.state,
          sarea: nameAddress.area,
          slat: nameAddress.lat,
          slng: nameAddress.lng,
          status: "ACTIVE",
          reportedDate,
        });
      } else {
        setEngage(true);
        // Missed call/incident save
        missedCall({
          user: user._id,
          name: user.name,
          lname: user.lname,
          number: user.number,
          type: route.params.type,
          scompleteaddress: nameAddress.completeaddress,
          scity: nameAddress.city,
          sstate: nameAddress.state,
          sarea: nameAddress.area,
          slat: nameAddress.lat,
          slng: nameAddress.lng,
          status: "DISPATCHER BUSY/UNAVAILABLE",
          reportedDate,
        });
      }
      // Check here if theres an opcen near and is online if not flag error
    } else {
      setNotSupported(true);
    }
  };

  useEffect(() => {
    if (createIncident && incident !== null) {
      navigation.navigate("ActiveIncident");
    }
  }, [createIncident]);

  return (
    <SafeAreaView style={styles.container}>
      {engage ? (
        <Alert
          msg={"All dispatchers are engage to a call..."}
          type={"Engage"}
          onClose={() => setEngage(false)}
        />
      ) : notSupported ? (
        <Alert
          msg={"Area not supported"}
          type={"NotSupported"}
          onClose={() => setNotSupported(false)}
        />
      ) : null}
      {/* <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View> */}

      <View style={styles.componentsContainer}>
        <View
          style={{
            paddingVertical: 18,
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.txtMain,
              {
                textAlign: "center",
                width: "100%",
                fontSize: 20,
              },
            ]}
          >
            Send incident of type{" "}
            <Text style={{ color: "#dc3545" }}> "{route.params.type}"</Text>
          </Text>
          <Text> (Map marker SHOWS your current location.)</Text>
        </View>
        <>
          {location ? (
            <View
              style={mapSize ? styles.mapContainer : styles.mapContainerLarge}
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
                  <MaterialIcons name="fullscreen" size={30} color="#215a75" />
                </TouchableOpacity>
              </View>

              <Map location={location} setNameAddress={setNameAddress} />
            </View>
          ) : (
            <View
              style={mapSize ? styles.mapContainer : styles.mapContainerLarge}
            >
              <Spinner />
            </View>
          )}
        </>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <Text
            style={[
              styles.txtMain,
              {
                textAlign: "center",
                width: "100%",
                fontSize: 20,
                color: "#dc3545",
              },
            ]}
          >
            Please confirm your location...
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",

            width: "90%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              paddingVertical: 10,
              color: "#333",
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {nameAddress.completeaddress}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={[styles.btnView, styles.btnMain]}
            onPress={() => onSubmit()}
          >
            <Text style={[styles.btnContent, styles.txtWhite]}>
              Send Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnView, styles.btnDanger, { marginBottom: 20 }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.btnContent, styles.txtWhite]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#215a75",
    //  Platform formatting
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },

  componentsContainer: {
    width: Dimensions.get("screen").width - 17,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  mapContainer: {
    borderRadius: 10,
    position: "relative",
    height: 280,
    width: "92%",
    zIndex: 10,
    ...Platform.select({
      ios: {
        height: Dimensions.get("screen").width,
        shadowColor: "#215a75",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  mapContainerLarge: {
    borderRadius: 10,
    position: "relative",
    height: Dimensions.get("screen").width - 40,
    width: "92%",
    ...Platform.select({
      ios: {
        height: Dimensions.get("screen").width + 50,
        shadowColor: "#215a75",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  backBtn: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 5,
  },

  btnView: {
    borderColor: "#fff",
    borderRadius: 5,
    height: 38,
    width: "90%",
    padding: 10,

    marginVertical: 4,
  },

  btnContent: {
    fontSize: 13,
    textAlign: "center",
  },
  btnMain: {
    backgroundColor: "#215a75",
  },
  btnDanger: {
    backgroundColor: "#dc3545",
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
});

export default IncidentCreate;
