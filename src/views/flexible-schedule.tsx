import React from "react";
import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import TextInputComponent from "../components/text-input";

import { RootStackParamList } from "../constants/types/root-stack";

type CourtDetailRouteProp = RouteProp<RootStackParamList, "FlexibleSchedule">;
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CourtDetailProps = {
  route: CourtDetailRouteProp;
};

export default function FlexibleSchedule({ route }: CourtDetailProps) {
  // const { court } = route.params;

  return (
    <View>
      <Text className="font-bold text-lg ">Nhập tổng số giờ chơi</Text>
      <TextInputComponent label="" />
    </View>
  );
}
