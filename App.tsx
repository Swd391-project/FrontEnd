import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { NativeWindStyleSheet } from "nativewind";

import BottomTab from "./src/components/bottom-tab/index";
import CourtDetail from "./src/views/court-detail";
import Register from "./src/views/register-page";
import AppBar from "./src/components/app-bar";
import Login from "./src/views/login-page";
import SplashScreen from "./src/views/splash-screen";
import Checkout from "./src/views/checkout-page";
import { AuthProvider } from "./app/context/auth-context";

import SingleDayBooking from "./src/views/single-day-booking";
import FixedSchedule from "./src/views/fixed-schedule";
import FlexibleSchedule from "./src/views/flexible-schedule";

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
                case "FixedSchedule":
                  return (
                    <AppBar
                      title="Đặt lịch cố định"
                      {...props}
                      showBackAction={true}
                      showMoreAction={false}
                    />
                  );
                case "SingleDayBooking":
                  return (
                    <AppBar
                      title="Đặt lịch theo ngày"
                      {...props}
                      showBackAction={true}
                      showMoreAction={false}
                    />
                  );
                case "FlexibleSchedule":
                  return (
                    <AppBar
                      title="Đặt lịch linh hoạt"
                      {...props}
                      showBackAction={true}
                      showMoreAction={false}
                    />
                  );
                case "Checkout":
                  return (
                    <AppBar
                      title="Thanh toán"
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
                case "Login":
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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CourtDetail" component={CourtDetail} />
          <Stack.Screen name="FixedSchedule" component={FixedSchedule} />
          <Stack.Screen name="SingleDayBooking" component={SingleDayBooking} />
          <Stack.Screen name="FlexibleSchedule" component={FlexibleSchedule} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
