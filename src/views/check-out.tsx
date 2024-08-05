import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  Image,
  Pressable,
  Linking,
} from "react-native";

import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native-paper";

import { useAuth } from "../../app/context/auth-context";
import { getRequest, postRequest } from "../helpers/api-requests";
import formatCurrency from "../helpers/price-format";

import { RootStackParamList } from "../constants/types/root-stack";

export type ConfirmBookingRouteProp = RouteProp<RootStackParamList, "CheckOut">;
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CheckOut({
  route,
}: {
  route: ConfirmBookingRouteProp;
}) {
  const { authState } = useAuth();

  const {
    bookingId,
    fullName,
    phoneNumber,
    courtName,
    courtAddress,
    totalPrice,
  } = route.params;

  const navigation = useNavigation<NavigationProp>();

  const [note, setNote] = useState<string>();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  const paymentMethod = [
    {
      value: "Momo",
      icon: () => (
        <Image
          className="w-12 h-12"
          source={require("../../assets/icons/MoMo_Logo.png")}
          alt=""
        />
      ),
    },
    {
      value: "VnPay",
      icon: () => (
        <Image
          className="w-12 h-12"
          source={require("../../assets/icons/VN_PAY.png")}
          alt=""
        />
      ),
    },
  ];

  const handleSelectPaymentMethod = (method: any) => {
    setSelectedMethod(method.value);
    setButtonDisable(false);
  };

  const handleCheckout = async (query: string) => {
    if (authState?.token) {
      getRequest(
        `/payment/url/${bookingId}?payment-option=${query}`,
        authState.token,
      )
        .then((response) => {
          const url = response.data["payment-url"];
          Linking.openURL(url)
            .then(() => {
              navigation.navigate("Home");
            })
            .catch(() => {
              Alert.alert("Lỗi", "Không thể mở liên kết thanh toán.");
            });
        })
        .catch(() => {
          Alert.alert("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại.");
        });
    }
  };

  const handleCheckoutWithSelectedMethod = () => {
    if (selectedMethod) {
      handleCheckout(selectedMethod);
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
        <Text className="text-base ">Địa chỉ: {courtAddress}</Text>
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

      <View className="bg-white p-5 rounded-lg mb-3">
        <Text className="text-xl font-bold mb-2">Phương thức thanh toán</Text>

        <View className="flex-row justify-around">
          {paymentMethod.map((method, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelectPaymentMethod(method)}
              className={`w-12 h-12 rounded-md ${
                selectedMethod === method.value
                  ? "bg-purple-700"
                  : "bg-purple-700 opacity-50"
              }`}
            >
              {method.icon ? method.icon() : null}
            </Pressable>
          ))}
        </View>
      </View>
      <View className="flex flex-row justify-center space-x-10">
        <Button
          mode="contained"
          className="rounded-lg"
          onPress={handleCheckoutWithSelectedMethod}
          disabled={buttonDisable}
        >
          <Text className="text-white font-bold text-center">
            Thanh toán ngay
          </Text>
        </Button>
        <Button
          className="bg-red-500 rounded-lg"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="text-white font-bold text-center">Đặt sân tiếp</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
