import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Alert } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useAuth } from "../../app/context/auth-context";
import DefaultButton from "../components/button";
import { postRequest } from "../helpers/api-requests";

import { RootStackParamList } from "../constants/types/root-stack";
import formatCurrency from "../helpers/price-format";

export type ConfirmBookingRouteProp = RouteProp<
  RootStackParamList,
  "ConfirmSingleDayBooking"
>;
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ConfirmSingleDayBooking({
  route,
}: {
  route: ConfirmBookingRouteProp;
}) {
  const { authState } = useAuth();

  const {
    fullName,
    phoneNumber,
    courtId,
    courtName,
    dayBooking,
    courtAddress,
    fromTime,
    toTime,
    totalHours,
    totalPrice,
  } = route.params;

  const navigation = useNavigation<NavigationProp>();

  const [note, setNote] = useState<string>("");

  const handleBookCourt = () => {
    if (authState?.token) {
      const requestBody = {
        date: dayBooking,
        "from-time": fromTime,
        "to-time": toTime,
        "phone-number": phoneNumber,
        "full-name": fullName,
        note: note,
      };

      postRequest(`/booking/${courtId}`, authState.token, requestBody)
        .then((data) => {
          Alert.alert(
            "Đặt sân thành công",
            "Sân đã được đặt thành công!",
            [
              {
                text: "Đặt tiếp",
                onPress: () => {
                  navigation.navigate("Home");
                },
              },
              {
                text: "Thanh toán",
                onPress: () => {
                  navigation.navigate("CheckOut", {
                    bookingId: data.id,
                    fullName,
                    phoneNumber,
                    courtId,
                    courtName,
                    dayBooking,
                    courtAddress,
                    fromTime,
                    toTime,
                    totalHours,
                    totalPrice,
                  });
                },
              },
            ],
            { cancelable: false },
          );
        })
        .catch(() => {
          Alert.alert(
            "Đặt sân không thành công",
            "Đã có lỗi xảy ra trong quá trình đặt sân. Vui lòng thử lại sau.",
            [{ text: "OK", onPress: () => {} }],
            { cancelable: false },
          );
        });
    }
  };

  return (
    <ScrollView className="flex-1 bg-amber-400 p-5">
      <View className="bg-white p-5 rounded-lg mb-3">
        <Text className="text-xl font-bold">Thông tin người đặt</Text>
        <Text className="text-base ">Tên: {fullName}</Text>
        <Text className="text-base ">Số điện thoại: {phoneNumber}</Text>
      </View>

      <View className="bg-white p-5 rounded-lg mb-3">
        <Text className="text-xl font-bold">Thông tin sân</Text>
        <Text className="text-base ">Tên sân: {courtName}</Text>
        <Text className="text-base ">Ngày: {dayBooking}</Text>
        <Text className="text-base ">Địa chỉ: {courtAddress}</Text>
        <Text className="text-base ">
          Thời gian: Từ {fromTime} đến {toTime} ({totalHours} giờ)
        </Text>
        <Text className="text-base ">
          Tổng tiền: {formatCurrency(totalPrice)}
        </Text>
      </View>
      <View className="bg-white p-5 rounded-lg mb-3">
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Ghi chú</Text>
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-4 h-24"
          multiline
          numberOfLines={4}
          placeholder="Nhập ghi chú (tùy chọn)"
          value={note}
          onChangeText={setNote}
        />
      </View>

      <DefaultButton title="Xác nhận" onPress={handleBookCourt} />
    </ScrollView>
  );
}
