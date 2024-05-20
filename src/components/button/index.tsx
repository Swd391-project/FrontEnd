import * as React from "react";
import { Button } from "react-native-paper";

type DefaultButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function DefaultButton({ title, onPress }: DefaultButtonProps) {
  return (
    <Button className="m-2 bg-[#7157a9]" mode="contained" onPress={onPress}>
      {title}
    </Button>
  );
}
