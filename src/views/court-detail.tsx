import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";

import {
  getRequest,
  getRequestImage,
  putRequest,
} from "../helpers/api-requests";
import { Court } from "../constants/types/court";
import TextInputComponent from "../components/text-input";
import { isManager } from "../helpers/roles-check";
import { useAuth } from "../../app/context/auth-context";
import SplashScreen from "./splash-screen";
import SelectButton from "../components/button/select-button";
import { formatTime, parseTimeStringToDate } from "../helpers/format-time";
import UploadImage from "../components/modal/upload-image";

import { RootStackParamList } from "../constants/types/root-stack";

type CourtDetailRouteProp = RouteProp<RootStackParamList, "CourtDetail">;

type CourtDetailProps = {
  route: CourtDetailRouteProp;
};

export type Hour = {
  startTime: Date | undefined;
  endTime: Date | undefined;
};

export default function CourtDetail({ route }: CourtDetailProps) {
  const { courtId, onSuccess } = route.params;

  const { authState } = useAuth();
  const isAllowedToEditCourt = isManager(authState?.user?.role);

  const [court, setCourt] = useState<Court>();
  const [courtName, setCourtName] = useState<string>("");
  const [courtAddress, setCourtAddress] = useState<string>("");
  const [hour, setHour] = useState<Hour>({
    startTime: undefined,
    endTime: undefined,
  });
  const [profileImageUri, setProfileImageUri] = useState<string>("");
  const [coverImageUri, setCoverImageUri] = useState<string>("");
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showUploadProfileImgModal, setShowUploadProfileImgModal] =
    useState(false);
  const [showUploadCoverImgModal, setShowUploadCoverImgModal] = useState(false);
  const [responseProfileImage, setResponseProfileImage] = useState<string>("");
  const [responseCoverImage, setResponseCoverImage] = useState<string>("");
  const [onEdit, setOnEdit] = useState(false);

  const handleEditPress = () => {
    setOnEdit(!onEdit);
  };

  const handleStartTimeChange = (
    event: any,
    selectedTime: Date | undefined,
  ) => {
    setShowStartTimePicker(false);
    setHour({ ...hour, startTime: selectedTime });
  };

  const handleEndTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowEndTimePicker(false);
    setHour({ ...hour, endTime: selectedTime });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getRequest(`/court-group/${courtId}`);
        setCourt(data);
        setCourtName(data.name);
        setCourtAddress(data.address);
        setHour({
          ...hour,
          startTime: parseTimeStringToDate(data["start-time"]),
          endTime: parseTimeStringToDate(data["end-time"]),
        });

        if (data["profile-image"]) {
          const profileImageUrl = await getRequestImage(data["profile-image"]);
          setProfileImageUri(profileImageUrl);
        }

        if (data["cover-image"]) {
          const coverImageUrl = await getRequestImage(data["cover-image"]);
          setCoverImageUri(coverImageUrl);
        }
      } catch (error) {
        console.error("Error fetching court detail data:", error);
      }
    };

    fetchData();
  }, [courtId, onEdit]);

  const handleOpenUploadProdileImgModal = () => {
    setShowUploadProfileImgModal(true);
  };

  const handleOpenUploadCoverImgModal = () => {
    setShowUploadCoverImgModal(true);
  };

  if (!court) {
    return <SplashScreen />;
  }

  const handleEditCourt = () => {
    Alert.alert(
      "Xác nhận cập nhật",
      "Bạn có chắc chắn muốn cập nhật thông tin sân này?",
      [
        {
          text: "Hủy bỏ",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: () => {
            updateCourt();
          },
        },
      ],
    );
  };

  const updateCourt = () => {
    if (authState?.token) {
      const requestBody = {
        name: courtName,
        address: courtAddress,
        "start-time": formatTime(hour.startTime),
        "end-time": formatTime(hour.endTime),
        "profile-image": responseProfileImage,
        "cover-image": responseCoverImage,
      };
      putRequest(`/court-group/${courtId}`, authState.token, requestBody)
        .then(() => {
          setProfileImageUri(responseProfileImage);
          setCoverImageUri(responseCoverImage);
          Toast.show({
            type: "success",
            text1: "Cập nhật thành công",
            visibilityTime: 5000,
            autoHide: true,
          });
          if (onSuccess) onSuccess();
          setOnEdit(false);
          setShowUploadProfileImgModal(false);
        })
        .catch(() => {
          Toast.show({
            type: "error",
            text1: "Không thể cập nhật thông tin sân",
            visibilityTime: 5000,
            autoHide: true,
          });
        });
    }
  };

  const handleCancle = () => {
    setOnEdit(!onEdit);
  };

  return (
    <ScrollView>
      <View className="flex-1 bg-white">
        <View>
          {coverImageUri ? (
            <Image
              className="w-full h-20 absolute"
              source={{ uri: coverImageUri }}
            />
          ) : (
            <Image
              className="w-full absolute h-20"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzarRZzdxjwFhIIdApYRTHBPLxbNUNj8thfA&s"
            />
          )}
          {isAllowedToEditCourt && onEdit && (
            <View>
              <AntDesign
                name="camera"
                size={30}
                color="black"
                onPress={handleOpenUploadCoverImgModal}
                style={{ position: "absolute", top: 10, right: 10 }}
              />
            </View>
          )}
          {showUploadCoverImgModal && (
            <UploadImage
              title="Chọn ảnh nền sân"
              image={coverImageUri}
              modalVisible={showUploadCoverImgModal}
              setModalVisible={setShowUploadCoverImgModal}
              setResponseImage={setResponseCoverImage}
              onPress={updateCourt}
            />
          )}
        </View>

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

          {isAllowedToEditCourt && onEdit && (
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
              title="Chọn ảnh đại diện sân"
              image={profileImageUri}
              modalVisible={showUploadProfileImgModal}
              setModalVisible={setShowUploadProfileImgModal}
              setResponseImage={setResponseProfileImage}
              onPress={updateCourt}
            />
          )}
        </View>
        <View className="bg-black h-0.5" />
        <View className="mb-4">
          {isAllowedToEditCourt && !onEdit && (
            <View className="flex-row-reverse pr-2 pt-4">
              <AntDesign
                onPress={handleEditPress}
                name="edit"
                size={30}
                color="black"
              />
            </View>
          )}
          {onEdit ? (
            <View className="m-4">
              <Text className="text-2xl font-bold">Tên sân:</Text>
              <TextInputComponent
                value={courtName}
                onChangeText={(text) => setCourtName(text)}
              ></TextInputComponent>

              <Text className="text-lg mb-2">Địa Chỉ:</Text>
              <TextInputComponent
                value={courtAddress}
                onChangeText={(text) => setCourtAddress(text)}
              ></TextInputComponent>
              <View className="flex justify-around flex-row">
                <View className="justify-center">
                  <Text className="text-base">Giờ mở cửa:</Text>
                  <SelectButton
                    title={
                      hour.startTime
                        ? formatTime(hour.startTime)
                        : "Chọn giờ mở cửa"
                    }
                    selected={true}
                    onPress={() => setShowStartTimePicker(true)}
                  />
                  {showStartTimePicker && (
                    <DateTimePicker
                      value={hour.startTime || new Date()}
                      mode="time"
                      is24Hour={true}
                      display="spinner"
                      onChange={handleStartTimeChange}
                    />
                  )}
                </View>
                <View className="justify-center">
                  <Text className="text-base">Giờ đóng cửa:</Text>
                  <SelectButton
                    title={
                      hour.endTime
                        ? formatTime(hour.endTime)
                        : "Chọn giờ đóng cửa"
                    }
                    selected={true}
                    onPress={() => setShowEndTimePicker(true)}
                  />
                  {showEndTimePicker && (
                    <DateTimePicker
                      value={hour.endTime || new Date()}
                      mode="time"
                      is24Hour={true}
                      display="spinner"
                      onChange={handleEndTimeChange}
                    />
                  )}
                </View>
              </View>
            </View>
          ) : (
            <View className="m-4">
              <Text className="w-30 text-2xl font-bold mb-2">
                Tên sân: {court.name}
              </Text>

              <Text className="text-lg mb-2">Địa chỉ: {court.address}</Text>

              <Text className="text-base mb-1">
                Giờ bắt đầu: {court["start-time"]}
              </Text>

              <Text className="text-base mb-1">
                Giờ kết thúc: {court["end-time"]}
              </Text>
            </View>
          )}
          <View className="m-4">
            <Text className="text-base mb-1">Trạng thái: {court.status}</Text>

            <Text className="text-base mb-1">Đánh giá: {court.rate}</Text>
          </View>
        </View>
        <View className="m-3">
          <Text className="text-xl font-bold mb-2">Ngày mở cửa:</Text>

          <View className="mt-2 rounded-lg shadow-sm border-2 mb-2">
            {court["weekday-activities"].map((item) => (
              <View key={item.id} className="flex-row items-center m-2">
                <Text style={{ width: 80 }}>{item.weekday}</Text>
                <Text style={{ flex: 1 }}>{item["activity-status"]}</Text>
              </View>
            ))}
          </View>
        </View>
        {onEdit && (
          <View className="flex flex-row justify-center space-x-10">
            <Button
              className="bg-[#7157a9] rounded-lg"
              onPress={handleEditCourt}
            >
              <Text className="text-white font-bold text-center">Xác nhận</Text>
            </Button>
            <Button className="bg-red-500 rounded-lg" onPress={handleCancle}>
              <Text className="text-white font-bold text-center">Quay lại</Text>
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
