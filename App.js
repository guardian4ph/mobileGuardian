import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import Landing from "./src/components/layout/Landing";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import IncidentModal from "./src/components/layout/IncidentModal";
import Home from "./src/components/home/Home";
import Register from "./src/components/auth/Register";
import Privacy from "./src/legal/Privacy";
import Terms from "./src/legal/Terms";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Landing"}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="IncidentModal" component={IncidentModal} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Terms" component={Terms} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
