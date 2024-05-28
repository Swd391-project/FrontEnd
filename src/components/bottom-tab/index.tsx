import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { useAuth } from "../../../app/context/auth-context";

import Home from "../../views/home-page";
import Account from "../../views/account-page";
import UserProfile from "../../views/user-profile";

export default function BottomTab() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Danh sách",
      focusedIcon: "format-list-bulleted",
    },
    { key: "account", title: "Tài Khoản", focusedIcon: "account" },
  ]);

  const { authState } = useAuth();

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    account: authState?.authenticated ? UserProfile : Account,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
