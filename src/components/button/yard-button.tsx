import React from "react";
import { Pressable, Text, Image, View } from "react-native";

import formatCurrency from "../../helpers/price-format";

import { Yard } from "../../constants/types/weekday-activity";

export type YardButtonProps = {
  yard: Yard;
  timeSelected: boolean;
  isSelected: boolean;
  onSelect: (yard: Yard) => void;
};

export default function YardButton({
  yard,
  timeSelected,
  isSelected,
  onSelect,
}: YardButtonProps) {
  const formattedPrice = formatCurrency(yard.price);
  const handlePress = () => {
    onSelect(yard);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={!timeSelected}
      className={`items-center justify-center ${
        timeSelected ? "" : "opacity-50"
      }`}
    >
      <Image source={require("../../../assets/icons/badminton-yard.png")} />
      <View
        className={`w-10 h-10 rounded-full bg-${isSelected ? "purple-700" : "white"} flex items-center justify-center absolute`}
      >
        <Text className={`text-${isSelected ? "white" : "gray"}`}>
          {yard.yardNumber}
        </Text>
      </View>
      <Text>{formattedPrice}</Text>
    </Pressable>
  );
}
