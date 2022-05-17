import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";

const Map = ({ location }) => {
  console.log("Location Map", location);

  const [region, setRegion] = useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  if (!location) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          onRegionChangeComplete={(region) => setRegion(region)}
        >
          <Marker coordinate={region}>
            <Image
              source={require("../../../assets/msp/pin.png")}
              style={{ width: 30, height: 30 }}
            />
          </Marker>
        </MapView>
        <TouchableOpacity
          style={styles.centerIcon}
          // onPress={setRegion(currentLoc)}
        >
          <MaterialIcons name="filter-center-focus" size={24} color="#215a75" />
        </TouchableOpacity>
        <Text style={styles.text}>Current latitude: {region.latitude}</Text>
        <Text style={styles.text}>Current longitude: {region.longitude}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 200,
  },
  map: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  centerIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 5,
  },
  text: {
    fontSize: 12,
  },
});

export default Map;
