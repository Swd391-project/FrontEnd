import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import SelectButton from "../button/select-button";

export type createTimeSlotProp = {
  setIsChoosen: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalHours: React.Dispatch<React.SetStateAction<number>>;
};

export default function TimeBooking({
  setIsChoosen,
  setTotalHours,
}: createTimeSlotProp) {
  const createTimeSlots = (startHour: any, endHour: any) => {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      times.push(formattedHour);
    }
    return times;
  };

  const times = createTimeSlots(5, 24);
  const [startTime, setStartTime] = useState<string | null>();
  const [endTime, setEndTime] = useState<string | null>();

  const handlePress = (time: string) => {
    if (!startTime) {
      setStartTime(time);
    } else if (!endTime) {
      const startHour = parseInt(startTime.split(":")[0]);
      const selectedHour = parseInt(time.split(":")[0]);

      if (selectedHour < startHour) {
        setEndTime(startTime);
        setStartTime(time);
      } else if (time === startTime) {
        setStartTime(time);
      } else {
        setEndTime(time);
      }
    } else {
      setStartTime(time);
      setEndTime(null);
    }
  };

  const calculateTotalHours = () => {
    if (startTime && endTime) {
      const startHour = parseInt(startTime.split(":")[0]);
      const endHour = parseInt(endTime.split(":")[0]);
      return endHour - startHour;
    }
    return 0;
  };

  useEffect(() => {
    const hours = calculateTotalHours();
    setTotalHours(hours);
  }, [startTime, endTime]);

  useEffect(() => {
    if (startTime && endTime) {
      setIsChoosen(true);
    } else {
      setIsChoosen(false);
    }
  }, [startTime, endTime]);

  return (
    <View className="p-4">
      <View className="flex flex-row flex-wrap">
        {times.map((time) => (
          <SelectButton
            key={time}
            title={time}
            onPress={() => handlePress(time)}
            selected={time === startTime || time === endTime}
          />
        ))}
      </View>
      <Text className="mt-4 text-lg">
        Số giờ đã chọn: {calculateTotalHours()}
      </Text>
    </View>
  );
}
