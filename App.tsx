import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { NativeWindStyleSheet } from "nativewind";

import BottomTab from "./src/components/bottom-tab";
import CourtDetail from "./src/views/court-detail";
import UserBooking from "./src/views/user-boking";
import AppBar from "./src/components/app-bar";

NativeWindStyleSheet.setOutput({
  default: "native",
});

import { RootStackParamList } from "./src/constants/types/root-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            header: (props) => {
              switch (route.name) {
                case "Home":
                  return (
                    <AppBar
                      {...props}
                      title="Danh sách"
                      showBackAction={false}
                      showSearchAction={true}
                      showMoreAction={true}
                    />
                  );
                case "CourtDetail":
                  return (
                    <AppBar
                      {...props}
                      title="Chi tiết sân"
                      showBackAction={true}
                      showSearchAction={false}
                      showMoreAction={true}
                    />
                  );
                case "UserBooking":
                  return (
                    <AppBar
                      title="Đặt lịch theo ngày"
                      {...props}
                      showBackAction={true}
                      showSearchAction={false}
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
