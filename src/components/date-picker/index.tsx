import React, { useState } from "react";
import { SafeAreaView, Text, Button, View, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import DefaultButton from "../button";

export type DatePickerProps = {
  onDateChange: (selectedDate: Date) => void;
};

export default function DatePickerComponent({ onDateChange }: DatePickerProps) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <View className="">
        <DefaultButton onPress={showDatepicker} title="Chọn ngày" />
      </View>
      <Text className="text-base">{date.toDateString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}
