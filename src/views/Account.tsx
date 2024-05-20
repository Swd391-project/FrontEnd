import { Text, View } from "react-native";

import TextInputComponent from "../components/TextInput";
import DefaultButton from "../components/button";

const Account = () => {
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
};
export default Account;
