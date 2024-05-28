import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { NativeWindStyleSheet } from "nativewind";

import BottomTab from "./src/components/bottom-tab/index";
import CourtDetail from "./src/views/court-detail";
import UserBooking from "./src/views/user-boking";
import AppBar from "./src/components/app-bar";

NativeWindStyleSheet.setOutput({
  default: "native",
});

import { RootStackParamList } from "./src/constants/types/root-stack";
import { AuthProvider } from "./app/context/auth-context";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <LayOut />
    </AuthProvider>
  );
}

export function LayOut() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            header: (props) => {
              switch (route.name) {
                case "CourtDetail":
                  return (
                    <AppBar
                      {...props}
                      title="Chi tiết sân"
                      showBackAction={true}
                      showMoreAction={true}
                    />
                  );
                case "UserBooking":
                  return (
                    <AppBar
                      title="Đặt lịch theo ngày"
                      {...props}
                      showBackAction={true}
                      showMoreAction={false}
                    />
                  );
                case "UserProfile":
                  return (
                    <AppBar
                      title="User Profile"
                      {...props}
                      showBackAction={true}
                      showMoreAction={false}
                    />
                  );
                default:
                  return <AppBar {...props} title="" />;
              }
            },
          })}
        >
          <Stack.Screen name="Home" component={BottomTab} />
          <Stack.Screen name="CourtDetail" component={CourtDetail} />
          <Stack.Screen name="UserBooking" component={UserBooking} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
