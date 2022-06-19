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
import { Provider as ProfileProvider } from "./src/context/ProfileContext";
import { Provider as AlertProvider } from "./src/context/AlertContext";
import { Provider as AnnouncementProvider } from "./src/context/AnnouncementContext";
import { Provider as PostProvider } from "./src/context/PostContext";
import { Provider as IncidentProvider } from "./src/context/IncidentContext.js";
import { Provider as ResponderProvider } from "./src/context/ResponderContext";
import Profile from "./src/components/profile/Profile";
import Messages from "./src/components/messages/Messages";
import CreateProfile from "./src/components/profileForms/CreateProfile";
import EditProfile from "./src/components/profileForms/EditProfile";
import SinglePost from "./src/components/post/SinglePost";
import AddEducation from "./src/components/profileForms/AddEducation";
import AddExperience from "./src/components/profileForms/AddExperience";
import Setting from "./src/components/dashboard/Setting";
import IncidentCreate from "./src/components/incident/IncidentCreate";
import ActiveIncident from "./src/components/incidentActive/ActiveIncident";
import IncidentClose from "./src/components/incidentActive/IncidentClose";
import IncidentMessenger from "./src/components/incidentActive/IncidentMessenger";

import Spinner from "./src/components/layout/Spinner";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ResponderProvider>
      <IncidentProvider>
        <PostProvider>
          <AnnouncementProvider>
            <ProfileProvider>
              <AlertProvider>
                <AuthProvider>
                  <NavigationContainer>
                    <Stack.Navigator
                      screenOptions={{
                        headerShown: false,
                      }}
                      initialRouteName={"Landing"}
                    >
                      <Stack.Screen name="Landing" component={Landing} />
                      <Stack.Screen
                        name="IncidentModal"
                        component={IncidentModal}
                      />
                      <Stack.Screen name="Register" component={Register} />
                      <Stack.Screen name="Login" component={Login} />
                      <Stack.Screen name="Privacy" component={Privacy} />
                      <Stack.Screen name="Terms" component={Terms} />
                      <Stack.Screen
                        name="AddEducation"
                        component={AddEducation}
                      />
                      <Stack.Screen
                        name="AddExperience"
                        component={AddExperience}
                      />
                      <Stack.Screen name="ForgotPass" component={ForgotPass} />
                      <Stack.Screen name="Otp" component={Otp} />
                      <Stack.Screen name="SinglePost" component={SinglePost} />
                      <Stack.Screen name="Posts" component={Posts} />
                      <Stack.Screen name="ID" component={ID} />
                      <Stack.Screen name="QrPhoto" component={QrPhoto} />
                      <Stack.Screen name="Profile" component={Profile} />
                      <Stack.Screen name="Messages" component={Messages} />
                      <Stack.Screen
                        name="CreateProfile"
                        component={CreateProfile}
                      />
                      <Stack.Screen
                        name="EditProfile"
                        component={EditProfile}
                      />
                      <Stack.Screen
                        name="IncidentCreate"
                        component={IncidentCreate}
                      />
                      <Stack.Screen
                        name="ActiveIncident"
                        component={ActiveIncident}
                      />
                      <Stack.Screen
                        name="IncidentClose"
                        component={IncidentClose}
                      />
                      <Stack.Screen
                        name="IncidentMessenger"
                        component={IncidentMessenger}
                      />
                      <Stack.Screen name="Spinner" component={Spinner} />
                      <Stack.Screen name="Setting" component={Setting} />
                    </Stack.Navigator>
                  </NavigationContainer>
                </AuthProvider>
              </AlertProvider>
            </ProfileProvider>
          </AnnouncementProvider>
        </PostProvider>
      </IncidentProvider>
    </ResponderProvider>
  );
}
