import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import SearchInput from "../TextInput/sreachBar";

const AppBar = ({ options, navigation, route }: NativeStackHeaderProps) => {
  const title = options.headerTitle ?? route.name;
  const [isSearch, setIsSearch] = useState(false);

  const goBack = () => navigation.goBack();
  const handleSearch = () => setIsSearch(!isSearch);

  const handleMore = () => console.log("Filter");

  return (
    <>
      <Appbar.Header className="bg-[#7157a9] text-center text-white">
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={title as String} />
        <Appbar.Action icon="magnify" onPress={handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={handleMore} />
      </Appbar.Header>
      {isSearch && <SearchInput />}
    </>
  );
};

export default AppBar;
