import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { NativeWindStyleSheet } from "nativewind";

import BottomTab from "./src/components/bottom-tab/index";
import CourtDetail from "./src/views/court-detail";
import UserBooking from "./src/views/user-boking";
import Register from "./src/views/register-page";
import AppBar from "./src/components/app-bar";
import SplashScreen from "./src/views/splash-screen";
import { AuthProvider } from "./app/context/auth-context";

import { RootStackParamList } from "./src/constants/types/root-stack";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <LayOut />
    </AuthProvider>
  );
}

export function LayOut() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  });

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            header: (props) => {
              switch (route.name) {
                case "Home":
                  return <AppBar {...props} />;
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
                case "Register":
                  return (
                    <AppBar
                      {...props}
                      showBackAction={true}
                      showMoreAction={false}
                    />
                  );
                case "Splack":
                  return;
              }
            },
          })}
        >
          {isShowSplashScreen ? (
            <Stack.Screen name="Splack" component={SplashScreen} />
          ) : (
            <Stack.Screen name="Home" component={BottomTab} />
          )}

          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="CourtDetail" component={CourtDetail} />
          <Stack.Screen name="UserBooking" component={UserBooking} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
