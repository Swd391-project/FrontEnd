import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";

import BottomTab from "./src/components/bottom-tab";
import CourtDetail from "./src/views/court-detail";
import UserBooking from "./src/views/user-boking";
import AppBar from "./src/components/app-bar";

import { RootStackParamList } from "./src/constants/types/root-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <AppBar {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={BottomTab} />
          <Stack.Screen name="CourtDetail" component={CourtDetail} />
          <Stack.Screen name="UserBooking" component={UserBooking} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
