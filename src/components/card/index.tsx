import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";

import DefaultButton from "../button";
import { Court } from "../../constants/types/court";
import { RootStackParamList } from "../../constants/types/root-stack";
import SelectBookingTypeModal from "../modal/select-booking-type-modal";
import { getRequestImage } from "../../helpers/api-requests";

type CourtCardProps = {
  court: Court;
  onSuccess: () => void;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function BadmintonCourtCard({
  court,
  onSuccess,
}: CourtCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const courtId = court.id;

  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string>("");

  useEffect(() => {
    const getImageUrl = async () => {
      const imageUrl = await getRequestImage(court["profile-image"]);
      setImageUri(imageUrl);
    };

    getImageUrl();
  }, [court["profile-image"]]);

  return (
    <View className="bg-white p-5 m-2 rounded-lg shadow-sm border-2">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CourtDetail", { courtId, onSuccess })
        }
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: 200, borderRadius: 10 }}
          />
        ) : (
          <></>
        )}
        <Text className="text-lg font-bold mt-2">{court.name}</Text>
        <Text className="text-base text-gray-600 my-1">{court.address}</Text>
      </TouchableOpacity>
      <DefaultButton onPress={() => setModalVisible(true)} title="Đặt lịch" />
      <SelectBookingTypeModal
        courtId={court.id}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
