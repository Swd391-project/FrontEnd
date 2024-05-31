import React, { useEffect, useRef } from "react";
import { View, Image, Animated, ActivityIndicator } from "react-native";

import icon from "../../assets/icons/icon_splash.jpeg";

export default function SplashScreen() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  return (
    <View className="flex-1 justify-center items-center bg-[#7157a9]">
      <Animated.View
        style={{ opacity: fadeAnimation }}
        className="rounded-lg overflow-hidden"
      >
        <Image className="w-24 h-24" source={icon} />
        <ActivityIndicator size="large" color="#00ff00" />
      </Animated.View>
    </View>
  );
}
