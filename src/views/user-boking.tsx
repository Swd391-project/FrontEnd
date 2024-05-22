import React from "react";
import { View, Text } from "react-native";

import CourtCalendar from "../components/booking-calendar";

export default function UserBoking() {
  return (
    <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
      <CourtCalendar />
    </View>
  );
}
