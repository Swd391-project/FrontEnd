import React from "react";
import { View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../constants/types/rootStack";

type CourtDetailRouteProp = RouteProp<RootStackParamList, "CourtDetail">;

type CourtDetailProps = {
  route: CourtDetailRouteProp;
};

export default function CourtDetail({ route }: CourtDetailProps) {
  const { court } = route.params;

  return (
    <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
      <Text className="text-lg font-bold">{court.name}</Text>
      <Text className="text-base text-gray-600 my-1">{court.location}</Text>
      <Text className="text-sm text-gray-700">Rating: {court.rating}</Text>
      <Text className="text-sm text-gray-700">Trạng thái: {court.status}</Text>
      <Text className="text-sm text-gray-700">
        Số Điện thoại: {court.phone}
      </Text>
    </View>
  );
}
