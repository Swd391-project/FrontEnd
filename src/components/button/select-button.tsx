import React from "react";
import { Pressable, Text } from "react-native";

type DefaultButtonProps = {
  title: string;
  onPress?: () => void;
  selected?: boolean;
};

export default function SelectButton({
  title,
  onPress,
  selected = false,
}: DefaultButtonProps) {
  return (
    <Pressable
      className={`m-2 p-4 rounded-md ${
        selected ? "bg-purple-700" : "bg-purple-700 opacity-50"
      }`}
      onPress={onPress}
    >
      <Text className="text-white">{title}</Text>
    </Pressable>
  );
}
