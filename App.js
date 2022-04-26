import "react-native-gesture-handler";
import Landing from "./src/components/layout/Landing";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import IncidentModal from "./src/components/incident/IncidentModal";
import Home from "./src/components/home/Home";
import Register from "./src/components/auth/Register";
import Login from "./src/components/auth/Login";
import ForgotPass from "./src/components/auth/ForgotPass";
import Privacy from "./src/components/legal/Privacy";
import Terms from "./src/components/legal/Terms";
import Otp from "./src/components/auth/Otp";
import Post from "./src/components/post/Post";

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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
