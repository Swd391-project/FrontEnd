import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { ScrollView } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import TimeBooking from "../components/choose-time-booking";
import YardButton from "../components/button/yard-button";
import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";
import formatCurrency from "../helpers/price-format";
import DatePickerComponent from "../components/date-picker";
import ModalComponent from "../components/modal";

import { RootStackParamList } from "../constants/types/root-stack";
import { Yard } from "../constants/types/yard";
import { useAuth } from "../../app/context/auth-context";

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

export type CourtDetailProps = {
  route: CourtDetailRouteProp;
};

export default function SingleDayBooking({ route }: CourtDetailProps) {
  const [isChoosenTime, setIsChoosenTime] = useState(false);
  const [isSelectYard, setIsSelectYard] = useState(true);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedYards, setSelectedYards] = useState<Yard[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { authState } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const { court } = route.params;

  const handleSelectYard = (yard: Yard) => {
    const isSelected = selectedYards.find(
      (selectedYard) => selectedYard.id === yard.id
    );
    let updatedSelectedYards: Yard[] = [];
    if (isSelected) {
      updatedSelectedYards = selectedYards.filter(
        (selectedYard) => selectedYard.id !== yard.id
      );
    } else {
      updatedSelectedYards = [...selectedYards, yard];
    }
    setSelectedYards(updatedSelectedYards);
    setIsSelectYard(updatedSelectedYards.length > 0 ? false : true);
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

  const totalPrice = selectedYards.reduce((total, currentYard) => {
    return total + currentYard.price * totalHours;
  }, 0);

  const formattedPrice = formatCurrency(totalPrice);

  return (
    <ScrollView>
      <>
        <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
          <Text className="mb-4 font-bold text-lg">Chọn thời gian</Text>
          <DatePickerComponent onDateChange={setSelectedDay} />
          <TimeBooking
            setTotalHours={setTotalHours}
            setIsChoosen={setIsChoosenTime}
          />
          <Text className="mb-4 text-lg font-bold">Chọn sân</Text>
          {court.numberOfYard.map((yard) => (
            <YardButton
              key={yard.id}
              timeSelected={isChoosenTime}
              yard={yard}
              onSelect={handleSelectYard}
              isSelected={selectedYards.some(
                (selectedYard) => selectedYard.id === yard.id
              )}
            />
          ))}
          <Text className="mb-4 text-lg">Tổng tiền: {formattedPrice}</Text>
        </View>

        <Text className="mb-4 text-lg">Số Điện thoại</Text>
        <TextInputComponent label="Số Điện thoại"></TextInputComponent>
        <DefaultButton
          title="Đặt trước"
          disabled={isSelectYard}
          onPress={handleBookingPress}
        />
        <ModalComponent
          fields={fields}
          modalVisible={modalVisible}
          onPress={handleCheckoutPress}
          setModalVisible={setModalVisible}
        />
      </>
    </ScrollView>
  );
}
