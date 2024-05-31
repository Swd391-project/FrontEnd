import { useState } from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert } from "react-native";

import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";
import { useAuth } from "../../app/context/auth-context";
import { RootStackParamList } from "../constants/types/root-stack";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "Register">;

export default function Register({ navigation }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onRegister } = useAuth();

  const goBack = () => navigation.goBack();

  const register = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      Alert.alert("Error", result.msg);
    } else {
      Alert.alert("Đăng kí thành công!!", "", [
        {
          text: "Đăng nhập",
          onPress: () => goBack(),
        },
        {
          text: "Hủy",
          onPress: () => ({}),
        },
      ]);
    }
  };
  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold text-brown-700 text-center mb-4">
        Đăng Ký
      </Text>
      <TextInputComponent
        label="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />

      <TextInputComponent
        label="Tên đăng nhập"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />

      <TextInputComponent
        label="Mật khẩu"
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <TextInputComponent
        label="Xác nhận mật khẩu"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <View className="flex flex-row justify-center">
        <DefaultButton title="Đăng ký" onPress={register} />
      </View>
    </View>
  );
}
