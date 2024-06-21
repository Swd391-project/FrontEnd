import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Modal, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

import DefaultButton from "../button";
import SelectButton from "../button/select-button";
import { useState } from "react";

import { Court } from "../../constants/types/court";
import { RootStackParamList } from "../../constants/types/root-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ModalProps = {
  modalVisible: boolean;
  court: Court;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SelectBookingTypeModal({
  modalVisible,
  court,
  setModalVisible,
}: ModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp>();

  const handlePress = (option: string) => {
    setSelectedOption(option);
  };

  const handleBookNow = () => {
    switch (selectedOption) {
      case "fixed":
        setModalVisible(!modalVisible);
        navigation.navigate("FixedSchedule", { court });
        break;
      case "day":
        setModalVisible(!modalVisible);
        navigation.navigate("SingleDayBooking", { court });
        break;
      case "flexible":
        setModalVisible(!modalVisible);
        navigation.navigate("FlexibleSchedule", { court });
        break;
      default:
        setModalVisible(!modalVisible);
        break;
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="flex-1 justify-center items-center">
          <View className="bg-white rounded-lg p-3 shadow">
            <Text className="mb-4 text-center text-2xl font-bold m-5">
              Chọn loại hình đặt lịch
            </Text>
            <View>
              <Text>Chọn loại đặt lịch:</Text>
              <SelectButton
                title="Lịch cố định"
                onPress={() => handlePress("fixed")}
                selected={selectedOption === "fixed"}
              />
              <SelectButton
                title="Đặt lịch ngày"
                onPress={() => handlePress("day")}
                selected={selectedOption === "day"}
              />
              <SelectButton
                title="Lịch linh hoạt"
                onPress={() => handlePress("flexible")}
                selected={selectedOption === "flexible"}
              />
            </View>
            <View className="flex flex-row justify-center space-x-4">
              <Button
                className="bg-blue-500 rounded-lg"
                onPress={handleBookNow}
              >
                <Text className="text-white font-bold text-center">
                  Đặt ngay
                </Text>
              </Button>
              <Button
                className="bg-red-500 rounded-lg"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-white font-bold text-center">
                  Quay lại
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
