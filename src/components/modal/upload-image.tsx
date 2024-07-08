import React, { useState } from "react";
import { Text, Modal, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { postImageRequest } from "../../helpers/api-requests";

export type ModalProps = {
  title: string;
  modalVisible?: boolean;
  image: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setResponseImage: React.Dispatch<React.SetStateAction<string>>;
  onPress?: () => void;
};

export default function UploadImage({
  modalVisible,
  title,
  image,
  setModalVisible,
  setResponseImage,
  onPress,
}: ModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      const requestBody = new FormData();
      requestBody.append("file", {
        uri: result.assets[0].uri!,
        name: "image.jpg",
        type: "image/jpeg",
      } as any);

      postImageRequest(`/file-record/upload`, requestBody)
        .then((data) => {
          setResponseImage(data.url);
        })
        .catch((error) => {
          console.error("Upload failed: ", error);
        });
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View className="flex-1 justify-center items-center bg-[#0000007F]">
          <View className="bg-white rounded-lg p-10 shadow">
            <Text className="mb-4 text-center text-2xl font-bold m-5">
              {title}
            </Text>
            {selectedImage ? (
              <TouchableOpacity
                className="rounded-lg shadow-sm border-2"
                onPress={pickImage}
              >
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: "100%", height: 200 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="rounded-lg shadow-sm border-2"
                onPress={pickImage}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: 200 }}
                />
              </TouchableOpacity>
            )}

            <View className="flex flex-row justify-center space-x-4 mt-4">
              <Button className="bg-blue-500 rounded-lg" onPress={onPress}>
                <Text className="text-white font-bold text-center">
                  Xác nhận
                </Text>
              </Button>
              <Button
                className="bg-red-500 rounded-lg"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-white font-bold text-center">
                  Quay lại
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
