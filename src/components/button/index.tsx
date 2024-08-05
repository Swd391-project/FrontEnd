import * as React from "react";
import { Button } from "react-native-paper";

type DefaultButtonProps = {
  title: string;
  disabled?: boolean;
  className?: string;
  onPress?: () => void;
};

export default function DefaultButton({
  title,
  disabled,
  className,
  onPress,
}: DefaultButtonProps) {
  return (
    <Button
      className={"m-2 " && className}
      mode="contained"
      onPress={onPress}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}
