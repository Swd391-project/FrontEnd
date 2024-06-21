import React, { useState, useEffect } from "react";
import { View, Text, Switch } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { getVietnameseDay } from "../../helpers/translate-day";

export type DayState = {
  selected: boolean;
  startTime?: Date;
  endTime?: Date;
};

export type Days = {
  [key: string]: DayState;
};

export type DayOfWeekProps = {
  onDayTimeChange: (day: string, startTime?: Date, endTime?: Date) => void;
};

export default function DayOfWeek({ onDayTimeChange }: DayOfWeekProps) {
  const [selectedDays, setSelectedDays] = useState<Days>({
    Monday: { selected: false, startTime: undefined, endTime: undefined },
    Tuesday: { selected: false, startTime: undefined, endTime: undefined },
    Wednesday: { selected: false, startTime: undefined, endTime: undefined },
    Thursday: { selected: false, startTime: undefined, endTime: undefined },
    Friday: { selected: false, startTime: undefined, endTime: undefined },
    Saturday: { selected: false, startTime: undefined, endTime: undefined },
    Sunday: { selected: false, startTime: undefined, endTime: undefined },
  });

  const [currentEditingDay, setCurrentEditingDay] = useState<string | null>(
    null,
  );
  const [currentEditingField, setCurrentEditingField] = useState<
    "startTime" | "endTime" | null
  >(null);

  useEffect(() => {
    if (currentEditingDay && currentEditingField) {
      const { startTime, endTime } = selectedDays[currentEditingDay];
      onDayTimeChange(currentEditingDay, startTime, endTime);
    }
  }, [selectedDays]);

  const handleToggleDay = (day: string) => {
    setSelectedDays((prevState) => {
      const newSelectedState = {
        ...prevState,
        [day]: { ...prevState[day], selected: !prevState[day].selected },
      };

      if (prevState[day].selected && !newSelectedState[day].selected) {
        onDayTimeChange(day, undefined, undefined);
      }

      return newSelectedState;
    });
  };

  const handleTimeChange = (
    day: string,
    field: "startTime" | "endTime",
    selectedTime: Date | undefined,
  ) => {
    if (selectedTime) {
      setSelectedDays((prevState) => {
        const updatedDayState = {
          ...prevState[day],
          [field]: selectedTime,
        };

        return {
          ...prevState,
          [day]: updatedDayState,
        };
      });
    }
    setCurrentEditingDay(null);
    setCurrentEditingField(null);
  };

  const showTimePicker = (day: string, field: "startTime" | "endTime") => {
    setCurrentEditingDay(day);
    setCurrentEditingField(field);
  };

  const defaultDate = new Date();
  defaultDate.setMinutes(0);

  return (
    <View>
      {Object.keys(selectedDays).map((day) => (
        <View key={day} className="mb-5">
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Switch
              value={selectedDays[day].selected}
              onValueChange={() => handleToggleDay(day)}
              style={{ marginRight: 10 }}
            />
            <Text className="text-lg">{getVietnameseDay(day)}</Text>
          </View>
          {selectedDays[day].selected && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text className="mr-2 text-lg">Bắt đầu:</Text>
              <Text
                onPress={() => showTimePicker(day, "startTime")}
                style={{ marginRight: 10 }}
              >
                {selectedDays[day].startTime
                  ? selectedDays[day].startTime.toLocaleTimeString()
                  : "Chọn giờ"}
              </Text>
              <Text className="ml-2 mr-2 text-lg">Kết thúc:</Text>
              <Text onPress={() => showTimePicker(day, "endTime")}>
                {selectedDays[day].endTime
                  ? selectedDays[day].endTime.toLocaleTimeString()
                  : "Chọn giờ"}
              </Text>
            </View>
          )}
        </View>
      ))}
      {currentEditingDay && currentEditingField && (
        <DateTimePicker
          value={
            selectedDays[currentEditingDay][currentEditingField] || defaultDate
          }
          mode="time"
          display="clock"
          onChange={(event, selectedTime) =>
            handleTimeChange(
              currentEditingDay,
              currentEditingField,
              selectedTime,
            )
          }
        />
      )}
    </View>
  );
}
