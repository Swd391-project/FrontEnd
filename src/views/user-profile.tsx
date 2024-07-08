import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";
import "../../assets/icons/badminton-wallpaper-preview.jpg";

import { useAuth } from "../../app/context/auth-context";
import DefaultButton from "../components/button";
import { isAllowAll } from "../helpers/roles-check";
import { getRequestImage, putRequest } from "../helpers/api-requests";
import UploadImage from "../components/modal/upload-image";

export default function UserProfile() {
  const { authState, onLogout } = useAuth();

  const isAllowedToEditProfile = isAllowAll(authState?.user?.role);

  const [profileImageUri, setProfileImageUri] = useState<string>("");
  const [showUploadProfileImgModal, setShowUploadProfileImgModal] =
    useState(false);
  const [responseProfileImage, setResponseProfileImage] = useState<string>("");

  const handleOpenUploadProdileImgModal = () => {
    setShowUploadProfileImgModal(true);
  };
  if (authState?.user?.image) {
    const fetchProfileImage = async () => {
      const profileImageUrl = await getRequestImage(authState?.user!.image);
      setProfileImageUri(profileImageUrl);
    };

    fetchProfileImage();
  }

  const updateProfile = () => {
    if (authState?.token) {
      const requestBody = {
        image: responseProfileImage,
      };
      putRequest(`/user/${authState?.user?.id}`, authState.token, requestBody)
        .then(() => {
          setProfileImageUri(responseProfileImage);

          Toast.show({
            type: "success",
            text1: "Cập nhật thành công",
            visibilityTime: 5000,
            autoHide: true,
          });
          setShowUploadProfileImgModal(false);
        })
        .catch(() => {
          Toast.show({
            type: "error",
            text1: "Không thể cập nhật ảnh đại diện",
            visibilityTime: 5000,
            autoHide: true,
          });
        });
    }
  };

  return (
    <View>
      <View className="w-100 shadow-lg relative flex flex-col ">
        <Image
          className="w-full absolute h-20"
          source={require("../../assets/icons/badminton-wallpaper-preview.jpg")}
          alt=""
        />
        <View className="w-full flex m-4 ml-4 flex-row">
          {profileImageUri ? (
            <View className="rounded-full border-x-2">
              <Image
                className="w-28 h-28 p-1 bg-white rounded-full"
                source={{ uri: profileImageUri }}
              />
            </View>
          ) : (
            <View className="rounded-full border-x-2">
              <Image
                className="w-28 h-28 p-1 bg-white rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzarRZzdxjwFhIIdApYRTHBPLxbNUNj8thfA&s"
              />
            </View>
          )}
          {isAllowedToEditProfile && (
            <View className="mt-20">
              <AntDesign
                name="camera"
                size={30}
                color="black"
                onPress={handleOpenUploadProdileImgModal}
                style={{ position: "absolute", top: 10, right: 10 }}
              />
            </View>
          )}
          {showUploadProfileImgModal && (
            <UploadImage
              title="Chọn ảnh đại diện"
              image={profileImageUri}
              modalVisible={showUploadProfileImgModal}
              setModalVisible={setShowUploadProfileImgModal}
              setResponseImage={setResponseProfileImage}
              onPress={updateProfile}
            />
          )}
          <View className="mt-8 ml-3 flex flex-col">
            <Text
              className="text-2xl text-white font-bold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {authState!.user!["full-name"]}
            </Text>

            <Text className="font-semibold text-sm italic">
              {authState?.user?.role}
            </Text>
          </View>
        </View>

        <View className="bg-black h-0.5" />
        <DefaultButton title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
}
