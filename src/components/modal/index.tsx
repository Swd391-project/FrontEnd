import React from "react";
import { Modal, Text, View } from "react-native";

import { Button } from "react-native-paper";

export type ModalProps = {
  fields: { id: string; label?: string }[];
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onPress: () => void;
};

export default function ModalComponent({
  modalVisible,
  fields,
  setModalVisible,
  onPress,
}: ModalProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="flex-1 justify-center items-center">
          <View className="bg-white rounded-lg p-3 shadow">
            <Text className="mb-4 text-center text-2xl font-bold m-5">
              Thông tin đặt lịch
            </Text>

            <View className="mb-3">
              {fields.map((field) => (
                <View key={field.id} className="pb-5">
                  {field.label && <Text>{field.label}</Text>}
                </View>
              ))}
            </View>
            <View className="flex flex-row justify-center space-x-4">
              <Button className="bg-blue-500 rounded-lg" onPress={onPress}>
                <Text className="text-white font-bold text-center">
                  Thanh toán
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
