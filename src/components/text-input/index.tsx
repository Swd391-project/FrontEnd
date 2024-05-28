import React from "react";
import { TextInput } from "react-native-paper";

type textInputProp = {
  label: string;
  value?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
};
export default function TextInputComponent({
  label,
  value,
  secureTextEntry,
  onChangeText,
}: textInputProp) {
  return (
    <TextInput
      className="m-4"
      autoCapitalize="none"
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}
