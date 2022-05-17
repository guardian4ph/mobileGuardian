import React, { useEffect } from "react";
import "react-native-gesture-handler";
import Landing from "./src/components/layout/Landing";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import IncidentModal from "./src/components/incident/IncidentModal";
import Register from "./src/components/auth/Register";
import Login from "./src/components/auth/Login";
import ForgotPass from "./src/components/auth/ForgotPass";
import Privacy from "./src/components/legal/Privacy";
import Terms from "./src/components/legal/Terms";
import Otp from "./src/components/auth/Otp";
import Posts from "./src/components/posts/Posts";
import ID from "./src/components/id/ID";
import QrPhoto from "./src/components/id/QrPhoto";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setAuthToken from "./src/utils/setAuthToken";
import Profile from "./src/components/profile/Profile";
import Messages from "./src/components/messages/Messages";
import CreateProfile from "./src/components/profileForms/CreateProfile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Landing"}
        >
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="IncidentModal" component={IncidentModal} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="ID" component={ID} />
          <Stack.Screen name="QrPhoto" component={QrPhoto} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="CreateProfile" component={CreateProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
