import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert } from "react-native";

import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";
import { useAuth } from "../../app/context/auth-context";
import { RootStackParamList } from "../constants/types/root-stack";
import { emailRegex, passwordRegex, phoneRegex } from "../helpers/regex";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "Register">;

export default function Register({ navigation }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);
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
    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Email không hợp lệ.");
      valid = false;
    } else {
      setEmailError(undefined);
    }

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Số điện thoại không hợp lệ.");
      valid = false;
    } else {
      setPhoneError(undefined);
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa và số.",
      );
      valid = false;
    } else {
      setPasswordError(undefined);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu không trùng khớp.");
      valid = false;
    } else {
      setConfirmPasswordError(undefined);
    }

    if (!valid) {
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
    <View className="flex-1 p-4 bg-amber-400">
      <View className="bg-white p-5 rounded-lg">
        <Text className="text-2xl font-bold text-brown-700 text-center mb-4">
          Đăng Ký
        </Text>
        <View className="m-3">
          <TextInputComponent
            label="Họ và tên"
            onChangeText={(text: string) => setFullName(text)}
            value={fullName}
          />
        </View>

        <View className="m-3">
          <TextInputComponent
            label="Email"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            errorMessage={emailError}
          />
        </View>

        <View className="m-3">
          <TextInputComponent
            label="Số điện thoại"
            onChangeText={(text: string) => setPhoneNumber(text)}
            value={phoneNumber}
            errorMessage={phoneError}
          />
        </View>

        <View className="m-3">
          <TextInputComponent
            label="Mật khẩu"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            errorMessage={passwordError}
          />
        </View>

        <View className="m-3">
          <TextInputComponent
            label="Xác nhận mật khẩu"
            onChangeText={(text: string) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
            errorMessage={confirmPasswordError}
          />
        </View>

        <View className="flex flex-row justify-center">
          <DefaultButton
            title="Đăng ký"
            disabled={disable}
            onPress={register}
          />
        </View>
      </View>
    </View>
  );
}
