import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";

import HomeScreen from "./src/components/BottomTab";
import CourtDetail from "./src/views/CourtDetail";
import AppBar from "./src/components/AppBar";

import { RootStackParamList } from "./src/constants/types/rootStack";

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
