import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";

import HomeScreen from "./src/components/bottom-tab";
import CourtDetail from "./src/views/court-detail";
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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CourtDetail" component={CourtDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
