import React from "react";
import { View, Text, Image } from "react-native";
import { Fontisto } from "@expo/vector-icons";

import { useAuth } from "../../app/context/auth-context";
import DefaultButton from "../components/button";
import { isCustomer } from "../helpers/roles-check";

export default function UserProfile() {
  const { authState, onLogout } = useAuth();
  const isAllowedToShowProfile = isCustomer(authState?.user?.role);

  const handleMore = () => console.log("More");

  return (
    <View className="w-100 shadow-lg relative flex flex-col">
      <Image
        className="w-full opacity-80 absolute top-0 h-20"
        src="https://wallpapercave.com/wp/wp2302375.jpg"
        alt=""
      />
      <View className="w-full flex m-4 ml-4 flex-row">
        <Image
          className="w-28 h-28 p-1 bg-white rounded-full"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
          alt=""
        />
        <View className="mt-8 ml-3 flex flex-col">
          {authState?.user ? (
            <Text
              className="name text-2xl text-white font-bold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {authState.user["full-name"]}
            </Text>
          ) : (
            ""
          )}
          <Text className="font-semibold text-sm italic">
            {authState?.user?.role}
          </Text>
          <Text>TestRole: {isAllowedToShowProfile ? "Pass" : "Fail"}</Text>
        </View>
        <View className="mt-20 ml-10">
          <Fontisto
            name="more-v-a"
            size={24}
            color="black"
            onPress={handleMore}
          />
        </View>
      </View>

      <View className="bg-black h-0.5" />
      <DefaultButton title="Logout" onPress={onLogout} />
    </View>
  );
}
