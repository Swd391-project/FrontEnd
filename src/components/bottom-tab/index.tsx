import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";

import Home from "../../views/home";
import Account from "../../views/account";
import Screen2 from "../../views/Screen2";

const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Danh sách",
      focusedIcon: "format-list-bulleted",
    },
    { key: "account", title: "Tài Khoản", focusedIcon: "account" },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    account: Account,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
export default HomeScreen;
