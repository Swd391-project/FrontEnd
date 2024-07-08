import React, { useState } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { postRequest } from "../helpers/api-requests";
import { useAuth } from "../../app/context/auth-context";
import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";
import SelectButton from "../components/button/select-button";
import { formatTime } from "../helpers/format-time";

import { RootStackParamList } from "../constants/types/root-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CourtDetailRouteProp = RouteProp<RootStackParamList, "AddNewCourt">;

type CourtDetailProps = {
  route: CourtDetailRouteProp;
};

export type Hour = {
  startTime: Date | undefined;
  endTime: Date | undefined;
};

export default function AddNewCourt({ route }: CourtDetailProps) {
  const { authState } = useAuth();
  const { onSuccess } = route.params;

  const navigation = useNavigation<NavigationProp>();

  const [courtName, setCourtName] = useState("");
  const [courtAddress, setCourtAddress] = useState("");
  const [hour, setHour] = useState<Hour>({
    startTime: undefined,
    endTime: undefined,
  });
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleStartTimeChange = (
    event: any,
    selectedTime: Date | undefined,
  ) => {
    setShowStartTimePicker(false);
    setHour({ ...hour, startTime: selectedTime });
  };

  const handleEndTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowEndTimePicker(false);
    setHour({ ...hour, endTime: selectedTime });
  };

  const handleSaveCourt = () => {
    if (authState?.token) {
      const requestBody = {
        name: courtName,
        address: courtAddress,
        "start-time": formatTime(hour.startTime),
        "end-time": formatTime(hour.endTime),
      };

      postRequest(`/court-group`, authState.token, requestBody)
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Thêm sân mới thành công",
            visibilityTime: 5000,
            autoHide: true,
          });
          if (onSuccess) onSuccess();
          navigation.navigate("Home");
        })
        .catch(() => {
          Toast.show({
            type: "error",
            text1: "Không thể thêm sân mới",
            visibilityTime: 5000,
            autoHide: true,
          });
        });
    }
  };

  return (
    <View className="flex-1 p-5 bg-amber-400">
      <View className="bg-white p-5 rounded-lg">
        <Text className="text-lg font-bold mb-2">Thêm sân mới</Text>
        <View className="m-4 mb-0">
          <TextInputComponent
            label="Tên sân"
            value={courtName}
            onChangeText={(text) => setCourtName(text)}
          />
        </View>
        <View className="m-4">
          <TextInputComponent
            label="Địa chỉ"
            value={courtAddress}
            onChangeText={(text) => setCourtAddress(text)}
          />
        </View>
        <View className="flex justify-around flex-row">
          <View className="justify-center">
            <Text className="text-base">Giờ mở cửa:</Text>
            <SelectButton
              title={
                hour.startTime ? formatTime(hour.startTime) : "Chọn giờ mở cửa"
              }
              selected={true}
              onPress={() => setShowStartTimePicker(true)}
            />
            {showStartTimePicker && (
              <DateTimePicker
                value={hour.startTime || new Date()}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={handleStartTimeChange}
              />
            )}
          </View>
          <View className="justify-center">
            <Text className="text-base">Giờ đóng cửa:</Text>
            <SelectButton
              title={
                hour.endTime ? formatTime(hour.endTime) : "Chọn giờ đóng cửa"
              }
              selected={true}
              onPress={() => setShowEndTimePicker(true)}
            />
            {showEndTimePicker && (
              <DateTimePicker
                value={hour.endTime || new Date()}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={handleEndTimeChange}
              />
            )}
          </View>
        </View>
        <DefaultButton title="Thêm sân" onPress={handleSaveCourt} />
      </View>
    </View>
  );
}
