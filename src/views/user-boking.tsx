import React, { useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";

import TimeBooking from "../components/choose-time-booking";
import YardButton from "../components/button/yard-button";
import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";
import formatCurrency from "../helpers/price-format";

import { RootStackParamList } from "../constants/types/root-stack";
import { Yard } from "../constants/types/yard";

type CourtDetailRouteProp = RouteProp<RootStackParamList, "UserBooking">;

type CourtDetailProps = {
  route: CourtDetailRouteProp;
};

export default function UserBooking({ route }: CourtDetailProps) {
  const [isChoosen, setIsChoosen] = useState(false);
  const [selectedYards, setSelectedYards] = useState<Yard[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);
  const { court } = route.params;

  const handleSelectYard = (yard: Yard) => {
    const isSelected = selectedYards.find(
      (selectedYard) => selectedYard.id === yard.id,
    );
    if (isSelected) {
      const updatedSelectedYards = selectedYards.filter(
        (selectedYard) => selectedYard.id !== yard.id,
      );
      setSelectedYards(updatedSelectedYards);
    } else {
      setSelectedYards([...selectedYards, yard]);
    }
  };

  const totalPrice = selectedYards.reduce((total, currentYard) => {
    return total + currentYard.price * totalHours;
  }, 0);

  const formattedPrice = formatCurrency(totalPrice);

  return (
    <ScrollView>
      <>
        <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
          <Text className="mb-4 text-lg">Chọn thời gian</Text>
          <TimeBooking
            setTotalHours={setTotalHours}
            setIsChoosen={setIsChoosen}
          />
          <Text className="mb-4 text-lg">Chọn sân</Text>
          {court.numberOfYard.map((yard) => (
            <YardButton
              key={yard.id}
              timeSelected={isChoosen}
              yard={yard}
              onSelect={handleSelectYard}
              isSelected={selectedYards.some(
                (selectedYard) => selectedYard.id === yard.id,
              )}
            />
          ))}
          <Text className="mb-4 text-lg">Tổng tiền: {formattedPrice}</Text>
        </View>

        <Text className="mb-4 text-lg">Số Điện thoại</Text>
        <TextInputComponent label="Số Điện thoại"></TextInputComponent>
        <DefaultButton title="Đặt trước" />
      </>
    </ScrollView>
  );
}
