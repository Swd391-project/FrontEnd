import React from "react";
import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

type AppBarProps = NativeStackHeaderProps & {
  title?: string;
  showBackAction?: boolean;
  showSearchAction?: boolean;
};

export default function AppBar({
  title,
  navigation,
  showBackAction,
}: AppBarProps) {
  const goBack = () => navigation.goBack();
  const handleMore = () => console.log("Filter");

  return (
    <>
      <Appbar.Header className="bg-[#7157a9]">
        {showBackAction && (
          <Appbar.BackAction
            style={{ backgroundColor: "white" }}
            onPress={goBack}
          />
        )}
        <Appbar.Content color="white" title={title} />
      </Appbar.Header>
    </>
  );
}
