import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import DefaultButton from "../button";

import { Court } from "../../constants/types/court";
import { RootStackParamList } from "../../constants/types/root-stack";

type CourtCardProps = {
  court: Court;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CourtDetail"
>;

export default function BadmintonCourtCard({ court }: CourtCardProps) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
      <TouchableOpacity
        onPress={() => navigation.navigate("CourtDetail", { court })}
      >
        <Text className="text-lg font-bold">{court.name}</Text>
        <Text className="text-base text-gray-600 my-1">{court.location}</Text>
        <Text className="text-sm text-gray-700">
          Số điện thoại: {court.phone}
        </Text>
      </TouchableOpacity>
      <DefaultButton
        onPress={() => navigation.navigate("UserBooking", { court })}
        title="Đặt lịch"
      />
    </View>
  );
}
