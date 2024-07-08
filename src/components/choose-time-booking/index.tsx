import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import formatCurrency from "../../helpers/price-format";
import SelectButton from "../button/select-button";

export type createTimeSlotProp = {
  time: any[];
  setIsChoosen: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalHours: React.Dispatch<React.SetStateAction<number>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setFromTime: React.Dispatch<React.SetStateAction<string>>;
  setToTime: React.Dispatch<React.SetStateAction<string>>;
};

export default function TimeBooking({
  time,
  setIsChoosen,
  setTotalHours,
  setTotalPrice,
  setFromTime,
  setToTime,
}: createTimeSlotProp) {
  const [selectedTimes, setSelectedTimes] = useState<any[]>([]);

  const handlePress = (timeSlot: any) => {
    setSelectedTimes((prev) =>
      prev.some(
        (selectedTime) =>
          selectedTime["from-time"] === timeSlot["from-time"] &&
          selectedTime["to-time"] === timeSlot["to-time"],
      )
        ? prev.filter(
            (selectedTime) =>
              selectedTime["from-time"] !== timeSlot["from-time"] ||
              selectedTime["to-time"] !== timeSlot["to-time"],
          )
        : prev.length < 2
          ? [...prev, timeSlot]
          : prev,
    );
  };

  const calculateTotalHours = () => {
    if (selectedTimes.length < 2) return 0;
    const sortedTimes = selectedTimes.sort(
      (a, b) =>
        new Date(`1970-01-01T${a["from-time"]}:00`).getTime() -
        new Date(`1970-01-01T${b["from-time"]}:00`).getTime(),
    );
    const start = new Date(`1970-01-01T${sortedTimes[0]["from-time"]}:00`);
    const end = new Date(`1970-01-01T${sortedTimes[1]["to-time"]}:00`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return hours;
  };

  const calculateTotalPrice = () => {
    if (selectedTimes.length < 2) return 0;
    const sortedTimes = selectedTimes.sort(
      (a, b) =>
        new Date(`1970-01-01T${a["from-time"]}:00`).getTime() -
        new Date(`1970-01-01T${b["from-time"]}:00`).getTime(),
    );
    const start = new Date(`1970-01-01T${sortedTimes[0]["from-time"]}:00`);
    const end = new Date(`1970-01-01T${sortedTimes[1]["to-time"]}:00`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const pricePerHour = sortedTimes[0].price / 0.5; // Giả sử mỗi khoảng thời gian là 30 phút và giá là cho 30 phút
    const totalPrice = hours * pricePerHour;
    return totalPrice;
  };

  const calculateFromAndEndTime = () => {
    if (selectedTimes.length === 0) {
      setFromTime("");
      setToTime("");
      return;
    }
    const sortedTimes = selectedTimes.sort(
      (a, b) =>
        new Date(`1970-01-01T${a["from-time"]}:00`).getTime() -
        new Date(`1970-01-01T${b["from-time"]}:00`).getTime(),
    );
    setFromTime(sortedTimes[0]["from-time"]);
    setToTime(sortedTimes[sortedTimes.length - 1]["to-time"]);
  };

  useEffect(() => {
    setTotalHours(calculateTotalHours());
    setTotalPrice(calculateTotalPrice());
    calculateFromAndEndTime();
    setIsChoosen(selectedTimes.length === 2);
  }, [
    selectedTimes,
    setFromTime,
    setToTime,
    setTotalHours,
    setTotalPrice,
    setIsChoosen,
  ]);

  return (
    <>
      <View className="flex-row flex-wrap">
        {time.map((timeSlot) => (
          <SelectButton
            key={timeSlot.id}
            title={`${timeSlot["from-time"]} - ${timeSlot["to-time"]}`}
            onPress={() => handlePress(timeSlot)}
            selected={selectedTimes.some(
              (selectedTime) =>
                selectedTime["from-time"] === timeSlot["from-time"] &&
                selectedTime["to-time"] === timeSlot["to-time"],
            )}
          />
        ))}
      </View>
      <Text className="pt-4 text-lg">
        Số giờ đã chọn:{" "}
        {selectedTimes.length === 2 ? calculateTotalHours().toFixed(1) : 0} giờ
      </Text>
      <Text className="mt-2 text-lg">
        Tổng số tiền:{" "}
        {selectedTimes.length === 2
          ? formatCurrency(calculateTotalPrice())
          : formatCurrency(0)}
      </Text>
    </>
  );
}
