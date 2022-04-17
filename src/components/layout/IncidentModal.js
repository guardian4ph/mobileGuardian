import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IncidentModal = (props) => {
  const handlePress = () => {
    console.log("Text is Pressed");
  };
  const handlePressNo = () => {
    console.log("NO is Pressed");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <View>
          <View style={[styles.iconContainer, styles.borderTopLeft]}>
            <TouchableOpacity>
              <View>
                <Image
                  style={[styles.imgIcon, styles.shadow]}
                  source={require("../../../assets/icons/incident/Medical.png")}
                />
              </View>

              <Text style={[styles.txtWhite, styles.txtPaddingTop]}>
                Ambulance
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.iconContainer, styles.borderBottomLeft]}>
            <TouchableOpacity>
              <View>
                <Image
                  style={[styles.imgIcon, styles.shadow]}
                  source={require("../../../assets/icons/incident/Fire.png")}
                />
              </View>

              <Text style={[styles.txtWhite, styles.txtPaddingTop]}>Fire</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={[styles.iconContainer, styles.borderTopRight]}>
            <TouchableOpacity>
              <View>
                <Image
                  style={[styles.imgIcon, styles.shadow]}
                  source={require("../../../assets/icons/incident/Crime.png")}
                />
              </View>

              <Text style={[styles.txtWhite, styles.txtPaddingTop]}>
                Police
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.iconContainer, styles.borderBottomRight]}>
            <TouchableOpacity>
              <View>
                <Image
                  style={[styles.imgIcon, styles.shadow]}
                  source={require("../../../assets/icons/incident/Call.png")}
                />
              </View>

              <Text style={[styles.txtWhite, styles.txtPaddingTop]}>
                General
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity></TouchableOpacity>
      {/* <Text
        style={styles.txtWhite}
        numberOfLines={3}
        onPress={() => {
          // alert("Test");
          // handlePress();
          Alert.alert("This is an allert", "are you sure?", [
            { text: "Yes", onPress: () => handlePress() },
            { text: "No", onPress: () => handlePressNo() },
          ]);
        }}
      >
        welcome! cloyd cloyd clyds welcome! cloyd cloyd clyds welcome! cloyd
        cloyd clyds welcome! cloyd cloyd clyds welcome! cloyd cloyd clyds{" "}
        welcome! cloyd cloyd clyds welcome! cloyd cloyd clyds{" "}
      </Text> */}
    </SafeAreaView>
  );
};

export default IncidentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    // alignItems: "center",
    // justifyContent: "center",
    //  Platform formatting
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  txtWhite: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  txtPaddingTop: {
    paddingTop: 8,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 5,
  },

  imageContainer: {
    display: "flex",
    flexDirection: "row",
    width: 320,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 4,
    borderColor: "#fff",
  },
  iconContainer: {
    width: 160,
    height: 160,
    backgroundColor: "#215a75",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },

  imgIcon: {
    width: 80,
    height: 60,
    resizeMode: "contain",
  },

  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    }),
  },

  borderTopLeft: {
    borderTopLeftRadius: 30,
  },
  borderTopRight: {
    borderTopRightRadius: 30,
  },
  borderBottomLeft: {
    borderBottomLeftRadius: 30,
  },
  borderBottomRight: {
    borderBottomRightRadius: 30,
  },
});
