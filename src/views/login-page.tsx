import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";
import { useAuth } from "../../app/context/auth-context";
import { RootStackParamList } from "../constants/types/root-stack";
import { emailRegex, passwordRegex } from "../helpers/regex";

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );
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
    let valid = true;

    if (!emailRegex.test(username)) {
      setEmailError("Email không hợp lệ.");
      valid = false;
    } else {
      setEmailError(undefined);
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa và số.",
      );
      valid = false;
    } else {
      setPasswordError(undefined);
    }

    if (!valid) {
      return;
    }

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
    <View className="flex-1 p-4 bg-amber-400">
      <View className="bg-white p-5 rounded-lg">
        <Text className="text-2xl font-bold text-brown-700 text-center mb-4">
          Đăng nhập
        </Text>
        <View className="m-3">
          <TextInputComponent
            label="Email"
            value={username}
            onChangeText={(text: string) => setUsername(text)}
            errorMessage={emailError}
          />
        </View>
        <View className="m-3">
          <TextInputComponent
            label="Password"
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry={true}
            errorMessage={passwordError}
          />
        </View>
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
    </View>
  );
}
