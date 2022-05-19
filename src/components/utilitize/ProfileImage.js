import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ProfileImage = ({ setFilePath }) => {
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const permisionFunction = async () => {
    // here is how you can get the camera permission

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");

    if (imagePermission.status !== "granted") {
      alert("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      //pass this to Parent Component
      setFilePath(result);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <View alignItems="center">
          <View style={styles.photoContainer}>
            <View style={{ position: "relative" }}>
              <Image style={styles.profileImage} source={{ uri: imageUri }} />
            </View>
            <View style={{ position: "absolute", right: 20, bottom: 12 }}>
              <TouchableOpacity onPress={pick}>
                <Entypo name="camera" size={24} color="#ddd" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View alignItems="center">
          <View style={styles.photoContainer}>
            <View style={{ position: "relative" }}>
              <Image
                style={styles.profileImage}
                source={require("../../../assets/img/Profile/profile.jpg")}
              />
            </View>
            <View style={{ position: "absolute", right: 20, bottom: 12 }}>
              <TouchableOpacity onPress={pick}>
                <Entypo name="camera" size={24} color="#ddd" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 300,
    backgroundColor: "#215a75",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 300,
  },
});

export default ProfileImage;
