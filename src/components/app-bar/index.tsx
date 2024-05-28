import React from "react";
import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

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
  showMoreAction,
}: AppBarProps) {
  const goBack = () => navigation.goBack();
  const handleMore = () => console.log("Filter");

  return (
    <>
      <Appbar.Header className="bg-[#7157a9] text-center">
        {showBackAction && <Appbar.BackAction onPress={goBack} />}
        <Appbar.Content className="text-white" title={title} />
        {showMoreAction && (
          <Appbar.Action icon="dots-vertical" onPress={handleMore} />
        )}
      </Appbar.Header>
    </>
  );
}
