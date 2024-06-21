import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../constants/types/root-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import DayOfWeek from "../components/date-picker/day-of-week";
import DatePickerComponent from "../components/date-picker";
import { useAuth } from "../../app/context/auth-context";
import ModalComponent from "../components/modal";
import DefaultButton from "../components/button";
import { getVietnameseDay } from "../helpers/translate-day";

const fields = [
  {
    id: "name",
    label: "Tên:",
  },
  {
    id: "phone",
    label: "Số điện thoại:",
  },
  {
    id: "courtName",
    label: "Tên sân:",
  },
  {
    id: "day",
    label: "Ngày:",
  },
  {
    id: "address",
    label: "Địa chỉ:",
  },
  {
    id: "time",
    label: "Thời gian:",
  },
  {
    id: "price",
    label: "Tổng tiền:",
  },
];

export type CourtDetailRouteProp = RouteProp<
  RootStackParamList,
  "SingleDayBooking"
>;
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type DayAndHour = {
  [day: string]: {
    startTime: Date | undefined;
    endTime: Date | undefined;
  };
};

export default function FixedSchedule() {
  const [startMonth, setStartMonth] = useState(new Date());
  const [endMonth, setEndMonth] = useState(new Date());
  const [dayAndHour, setDayAndHour] = useState<DayAndHour>({});
  const [modalVisible, setModalVisible] = useState(false);

  const { authState } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const handleDayTimeChange = (
    day: string,
    startTime?: Date,
    endTime?: Date,
  ) => {
    setDayAndHour((prevState) => {
      const updatedState = { ...prevState };

      if (startTime !== undefined && endTime !== undefined) {
        updatedState[day] = { startTime, endTime };
      } else {
        delete updatedState[day];
      }

      return updatedState;
    });
  };

  const getHourFromDate = (date: Date | undefined): number | undefined => {
    return date ? date.getHours() : undefined;
  };

  const handleBookingPress = () => {
    if (authState?.authenticated) {
      setModalVisible(!modalVisible);
    } else {
      Alert.alert("Bạn cần đăng nhập", "Vui lòng đăng nhập để tiếp tục.", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  const handleCheckoutPress = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("Checkout");
  };

  return (
    <ScrollView>
      <View className="flex-1 p-3 bg-gray-100">
        <View className=" bg-white justify-between mb-4 rounded-lg">
          <Text className="text-lg pl-5 pt-4 text-gray-800 font-bold">
            Chọn ngày bắt đầu và kết thúc
          </Text>
          <View className="flex flex-row justify-between mb-3">
            <View className="p-2 pl-5">
              <Text className="text-lg pl-3 text-gray-800">Từ ngày</Text>
              <DatePickerComponent onDateChange={setStartMonth} />
            </View>

            <View className="p-2 pr-5">
              <Text className="text-lg pl-3 text-gray-800">Đến ngày</Text>
              <DatePickerComponent onDateChange={setEndMonth} />
            </View>
          </View>
        </View>

        <View className="bg-white justify-between mb-4 rounded-lg">
          <Text className="text-lg pl-5 pt-4 text-gray-800 font-bold">
            Chọn thời gian
          </Text>
          <View className="pl-5">
            <DayOfWeek onDayTimeChange={handleDayTimeChange}></DayOfWeek>

            <Text className="text-lg pt-4 text-gray-800 font-bold">
              Ngày và giờ đã chọn
            </Text>
            {Object.keys(dayAndHour).map((day) => (
              <View key={day} className="mb-2 rounded-lg bg-orange-300">
                <Text className="font-medium p-2">{`Ngày ${getVietnameseDay(day)}:`}</Text>
                <Text className="p-2">{`Bắt đầu: ${getHourFromDate(dayAndHour[day].startTime)} giờ`}</Text>
                <Text className="p-2">{`Kết thúc: ${getHourFromDate(dayAndHour[day].endTime)} giờ`}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <DefaultButton
        title="Đặt trước"
        // disabled={isSelectYard}
        onPress={handleBookingPress}
      />
      <ModalComponent
        fields={fields}
        modalVisible={modalVisible}
        onPress={handleCheckoutPress}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
}
