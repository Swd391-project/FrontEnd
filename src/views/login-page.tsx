import { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";
import { useAuth } from "../../app/context/auth-context";
import { RootStackParamList } from "../constants/types/root-stack";

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const navigation = useNavigation<NavigationProp>();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold text-brown-700 text-center mb-4">
        Đăng nhập
      </Text>
      <TextInputComponent
        label="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <TextInputComponent
        label="Password"
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <View className="flex flex-row justify-center">
        <DefaultButton title="Đăng nhập" onPress={login} />
      </View>

      <View className="flex flex-row justify-center">
        <Text className="pr-1">Chưa có tài khoản</Text>
        <Text
          className="text-blue-600 underline"
          onPress={() => navigation.navigate("Register")}
        >
          Đăng kí ngay
        </Text>
      </View>
    </View>
  );
}
