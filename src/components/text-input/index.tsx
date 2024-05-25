import React, { useState } from "react";
import { TextInput } from "react-native-paper";

type textInputProp = {
  label: string;
};
export default function TextInputComponent({ label }: textInputProp) {
  const [text, setText] = useState("");

  return (
    <TextInput
      className="m-4"
      label={label}
      value={text}
      onChangeText={(text) => setText(text)}
    />
  );
}
