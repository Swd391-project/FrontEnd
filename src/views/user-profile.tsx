import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../app/context/auth-context";
import DefaultButton from "../components/button";

export default function UserProfile() {
  const { onLogout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is the UserProfile page</Text>
      <DefaultButton title="Đăng xuất" onPress={onLogout} />
    </View>
  );
}
