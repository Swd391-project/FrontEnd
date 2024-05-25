import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import SearchInput from "../text-input/sreach-bar";

type AppBarProps = NativeStackHeaderProps & {
  title: string;
  showBackAction?: boolean;
  showSearchAction?: boolean;
  showMoreAction?: boolean;
};

export default function AppBar({
  title,
  navigation,
  showBackAction,
  showSearchAction,
  showMoreAction,
}: AppBarProps) {
  const [isSearch, setIsSearch] = useState(false);

  const goBack = () => navigation.goBack();
  const handleSearch = () => setIsSearch(!isSearch);
  const handleMore = () => console.log("Filter");

  return (
    <>
      <Appbar.Header className="bg-[#7157a9] text-center text-white">
        {showBackAction && <Appbar.BackAction onPress={goBack} />}
        <Appbar.Content title={title} />
        {showSearchAction && (
          <Appbar.Action icon="magnify" onPress={handleSearch} />
        )}
        {showMoreAction && (
          <Appbar.Action icon="dots-vertical" onPress={handleMore} />
        )}
      </Appbar.Header>
      {isSearch && <SearchInput />}
    </>
  );
}
