import { useState } from "react";
import { Text, View } from "react-native";

import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";
import { useAuth } from "../../app/context/auth-context";

type AccountProps = {
  navigation?: any;
  route: any;
};

export default function Account({}: AccountProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
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
      <View className="flex flex-row justify-between mt-4">
        <DefaultButton title="Đăng ký" onPress={register} />
        <DefaultButton title="Đăng nhập" onPress={login} />
      </View>
    </View>
  );
}
