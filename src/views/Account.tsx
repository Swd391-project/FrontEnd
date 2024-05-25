import { Text, View } from "react-native";

import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";

export default function Account() {
  return (
    <View className="flex-1 ">
      <Text className="text-2xl font-bold text-brown-700 items-center">
        Đăng nhập
      </Text>
      <TextInputComponent label="Email"></TextInputComponent>
      <TextInputComponent label="Password"></TextInputComponent>

      <View className="flex flex-row justify-between">
        <DefaultButton title="Đăng ký" />
        <DefaultButton title="Đăng nhập" />
      </View>
    </View>
  );
}
