import React, { useState } from "react";
import { SafeAreaView, Text, Button, View, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export type DatePickerProps = {
  onDateChange: (selectedDate: Date) => void;
};

const DatePickerComponent: React.FC<DatePickerProps> = ({ onDateChange }) => {
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
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="mb-5">
        <Button onPress={showDatepicker} title="Chọn ngày" />
      </View>
      <Text className="text-base">{date.toDateString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export default DatePickerComponent;
