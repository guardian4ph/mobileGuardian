import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

const IncidentMessages = ({
  message,
  own,
  incidentId,
  responderProfilePic,
}) => {
  // console.log("OWWWNNN", message);
  const [onLoadImage, setLoadImage] = useState(false);
  const scrollRef = useRef(null);

  const imageLoading = () => {
    setLoadImage(true);
  };

  const timeDifference = () => {
    var current = new Date();
    var formatDate = new Date(message.createdAt);

    var minutes = 60 * 1000;
    var hours = minutes * 60;
    var days = hours * 24;
    var months = days * 30;
    var years = days * 365;

    var elapsed = current - formatDate;

    if (elapsed < minutes) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < hours) {
      return Math.round(elapsed / minutes) + " minutes ago";
    } else if (elapsed < days) {
      return Math.round(elapsed / hours) + " hours ago";
    } else if (elapsed < months) {
      return Math.round(elapsed / days) + " days ago";
    } else if (elapsed < years) {
      return Math.round(elapsed / months) + " months ago";
    } else {
      return Math.round(elapsed / years) + " years ago";
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={own ? styles.containerMine : styles.containerOtherGuy}>
        {!own ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              style={styles.postLogo}
              source={
                onLoadImage
                  ? {
                      uri: `http://10.128.50.114:5000/${responderProfilePic}`,
                    }
                  : require(`../../../assets/defaultImage.png`)
              }
              onLoad={() => imageLoading()}
            />
          </View>
        ) : null}

        <View style={own ? styles.mine : styles.otherguy}>
          <Text style={own ? styles.txtMine : styles.txtOtherGuy}>
            {message.text}
          </Text>
        </View>
      </View>
      <Text style={own ? styles.postDateMine : styles.postDateOther}>
        {moment(message.createdAt).format("lll")} {timeDifference()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMine: {
    maxWidth: "80%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  containerOtherGuy: {
    maxWidth: "80%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  mine: {
    backgroundColor: "#ddd",
    borderRadius: 17,
    margin: 3,
    maxWidth: "80%",
  },
  otherguy: {
    backgroundColor: "#7498a9",
    borderRadius: 17,
    margin: 3,
    maxWidth: "80%",
  },
  postDateOther: {
    color: "#aaa",
    fontSize: 11,
    marginLeft: 80,
  },
  postDateMine: {
    color: "#aaa",
    fontSize: 11,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  txtMine: {
    color: "#333",
    padding: 10,
    margin: 5,
  },
  txtOtherGuy: {
    color: "#fff",
    padding: 10,
    margin: 5,
  },
  postLogo: {
    width: 50,
    height: 50,
    marginHorizontal: 8,
    borderRadius: 50,
  },
});
export default IncidentMessages;
