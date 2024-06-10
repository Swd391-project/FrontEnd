import { useEffect, useState } from "react";
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
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const { onRegister } = useAuth();

  const goBack = () => navigation.goBack();

  useEffect(() => {
    if (email && fullName && phoneNumber && password && confirmPassword) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, fullName, phoneNumber, password, confirmPassword]);

  const register = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không trùng khớp", [
        {
          text: "Ok",
        },
      ]);
      return;
    }

    const result = await onRegister!(email, fullName, phoneNumber, password);
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
        label="Họ và tên"
        onChangeText={(text: string) => setFullName(text)}
        value={fullName}
      />

      <TextInputComponent
        label="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />

      <TextInputComponent
        label="Số điện thoại"
        onChangeText={(text: string) => setPhoneNumber(text)}
        value={phoneNumber}
      />

      <TextInputComponent
        label="Mật khẩu"
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <TextInputComponent
        label="Xác nhận mật khẩu"
        onChangeText={(text: string) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry={true}
      />
      <View className="flex flex-row justify-center">
        <DefaultButton title="Đăng ký" disabled={disable} onPress={register} />
      </View>
    </View>
  );
}
