import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { useAuth } from "../../../app/context/auth-context";

import Home from "../../views/home-page";
import Login from "../../views/login-page";
import BookingHistory from "../../views/booking-history";
import UserProfile from "../../views/user-profile";

export default function BottomTab() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Danh sách",
      focusedIcon: "format-list-bulleted",
    },
    {
      key: "history",
      title: "Đã đặt",
      focusedIcon: "arm-flex",
    },
    { key: "account", title: "Tài Khoản", focusedIcon: "account" },
  ]);

  const { authState } = useAuth();

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    history: BookingHistory,
    account: authState?.authenticated ? UserProfile : Login,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
