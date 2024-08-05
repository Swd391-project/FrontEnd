import React from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";

type TextInputProp = {
  label?: string;
  value?: string;
  secureTextEntry?: boolean;
  errorMessage?: string;
  onChangeText?: (text: string) => void;
};

export default function TextInputComponent({
  label,
  value,
  secureTextEntry,
  errorMessage,
  onChangeText,
}: TextInputProp) {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        mode="outlined"
      />
      {errorMessage ? (
        <Text style={{ color: "red", marginTop: 4 }}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}
