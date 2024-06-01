import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export default function DatePickerComponent() {
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <SafeAreaView>
      <Text>Đã chọn: {date.toLocaleString()}</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"date"}
        is24Hour={true}
        onChange={onChange}
      />
    </SafeAreaView>
  );
}
