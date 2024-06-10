import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";
import { useAuth } from "../../app/context/auth-context";
import { RootStackParamList } from "../constants/types/root-stack";

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState<boolean>(true);
  const { onLogin } = useAuth();

  useEffect(() => {
    if (username && password) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [username, password]);

  const navigation = useNavigation<NavigationProp>();

  const login = async () => {
    const result = await onLogin!(username, password);
    if (result && result.error) {
      Alert.alert("Lỗi", "Sai tên đăng nhập hoặc mật khẩu.", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold text-brown-700 text-center mb-4">
        Đăng nhập
      </Text>
      <TextInputComponent
        label="Email"
        onChangeText={(text: string) => setUsername(text)}
        value={username}
      />
      <TextInputComponent
        label="Password"
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <View className="flex flex-row justify-center">
        <DefaultButton title="Đăng nhập" disabled={disable} onPress={login} />
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
