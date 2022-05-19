import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import AppLoading from "expo-app-loading";
import Geocoder from "react-native-geocoding";

const Map = ({ location, setNameAddress }) => {
  Geocoder.init(process.env.GOOGLE_MAPS_API_KEY);

  const [region, setRegion] = useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const getArea = (addressArray) => {
    let city = "";
    for (let index = 0; index < addressArray.length; index++) {
      if (
        addressArray[index].types[0] &&
        "administrative_area_level_2" === addressArray[index].types[0]
      ) {
        city = addressArray[index].long_name;
        return city;
      }
    }
  };

  const getCity = (addressArray) => {
    let area = "";
    for (let index = 0; index < addressArray.length; index++) {
      if (addressArray[index].types[0]) {
        for (let j = 0; j < addressArray.length; j++) {
          if (
            "sublocality_level_1" === addressArray[index].types[j] ||
            "locality" === addressArray[index].types[j]
          ) {
            area = addressArray[index].long_name;
            return area;
          }
        }
      }
    }
  };

  const getState = (addressArray) => {
    let state = "";
    for (let index = 0; index < addressArray.length; index++) {
      for (let index = 0; index < addressArray.length; index++) {
        if (
          addressArray[index].types[0] &&
          "administrative_area_level_2" === addressArray[index].types[0]
        ) {
          state = addressArray[index].long_name;
          return state;
        }
      }
    }
  };

  useEffect(() => {
    Geocoder.from({
      latitude: region.latitude,
      longitude: region.longitude,
    })
      .then((response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          state = getState(addressArray),
          area = getArea(addressArray);

        setNameAddress({
          completeaddress: address,
          city: city ? city : "",
          area: area ? area : "",
          state: state ? state : "",
          lat: region.latitude,
          lng: region.longitude,
        });
      })
      .catch((error) => console.warn(error));
  }, [region]);

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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  container2: {
    position: "relative",
    height: 600,
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
});

export default Map;
