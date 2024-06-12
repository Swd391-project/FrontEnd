import * as React from "react";
import { Button } from "react-native-paper";

type DefaultButtonProps = {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
};

export default function DefaultButton({
  title,
  disabled,
  onPress,
}: DefaultButtonProps) {
  return (
    <Button
      className={"m-2 "}
      mode="contained"
      onPress={onPress}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}
