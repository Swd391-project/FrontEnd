import React, { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView, Image } from "react-native";

import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import TimeBooking from "../components/choose-time-booking";
import TextInputComponent from "../components/text-input";
import DefaultButton from "../components/button";
import formatCurrency from "../helpers/price-format";
import DatePickerComponent from "../components/date-picker";
import ModalComponent from "../components/modal";
import { formatDateToString } from "../helpers/format-date-to-string";
import { useAuth } from "../../app/context/auth-context";
import { Court } from "../constants/types/court";
import {
  getRequest,
  getRequestImage,
  postRequest,
} from "../helpers/api-requests";
import SplashScreen from "./splash-screen";

import { RootStackParamList } from "../constants/types/root-stack";

export type CourtDetailRouteProp = RouteProp<
  RootStackParamList,
  "SingleDayBooking"
>;
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type CourtProps = {
  route: CourtDetailRouteProp;
};

export default function SingleDayBooking({ route }: CourtProps) {
  const { courtId } = route.params;

  const { authState } = useAuth();

  const [fullName, setFullName] = useState<string>(
    authState?.user ? authState.user["full-name"] : "",
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    authState?.user ? authState.user["phone-number"] : "",
  );
  const [court, setCourt] = useState<Court>();
  const [profileImageUri, setProfileImageUri] = useState<string>("");
  const [time, setTime] = useState<string[]>([]);
  const [isChoosenTime, setIsChoosenTime] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [totalHours, setTotalHours] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToime] = useState<string>("");

  const navigation = useNavigation<NavigationProp>();

  const DayString = formatDateToString(selectedDay);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getRequest(`/court-group/${courtId}`);
        setCourt(data);
        if (data["profile-image"]) {
          const profileImageUrl = await getRequestImage(data["profile-image"]);
          setProfileImageUri(profileImageUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [courtId]);

  useEffect(() => {
    const requestBody = {
      date: DayString,
    };
    postRequest(`/court-group/booking-page/${courtId}`, "", requestBody)
      .then((data) => {
        setTime(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [DayString]);

  const handleBookingPress = () => {
    if (authState?.authenticated) {
      setModalVisible(!modalVisible);
    } else {
      Alert.alert("Bạn cần đăng nhập", "Vui lòng đăng nhập để tiếp tục.", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  const handleConfirmPress = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("ConfirmSingleDayBooking", {
      fullName,
      phoneNumber,
      courtId,
      courtName: court!.name,
      dayBooking: DayString,
      courtAddress: court!.address,
      fromTime,
      toTime,
      totalHours,
      totalPrice,
    });
  };

  if (!court) {
    return <SplashScreen />;
  }

  const fields = [
    {
      id: "name",
      label: `Tên: ${fullName}`,
      value: fullName,
    },
    {
      id: "phone",
      label: `Số điện thoại ${phoneNumber}`,
    },
    {
      id: "courtName",
      label: `Tên sân ${court.name}`,
    },
    {
      id: "day",
      label: `Ngày: ${DayString}`,
    },
    {
      id: "address",
      label: `Địa chỉ: ${court.address}`,
    },
    {
      id: "time",
      label: `Từ ${fromTime} giờ đến ${toTime} giờ (${totalHours} giờ)`,
    },
    {
      id: "price",
      label: `Tổng tiền ${formatCurrency(totalPrice)}`,
    },
  ];

  return (
    <ScrollView>
      <View className="bg-amber-400">
        <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
          {profileImageUri ? (
            <View className="">
              <Image
                className="w-50 h-28 p-1 bg-white rounded-lg"
                source={{ uri: profileImageUri }}
              />
            </View>
          ) : (
            <View className="">
              <Image
                className="w-50 h-28 p-1 bg-white "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzarRZzdxjwFhIIdApYRTHBPLxbNUNj8thfA&s"
              />
            </View>
          )}
          <Text className="text-xl font-bold mt-2">Sân: {court.name}</Text>
          <Text className="text-base mb-1">Địa chỉ: {court.address}</Text>
        </View>
        <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
          <Text className="text-xl font-bold">Chọn thời gian</Text>
          <DatePickerComponent onDateChange={setSelectedDay} />
          <TimeBooking
            setTotalPrice={setTotalPrice}
            time={time}
            setTotalHours={setTotalHours}
            setIsChoosen={setIsChoosenTime}
            setFromTime={setFromTime}
            setToTime={setToime}
          />
        </View>

        <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
          <Text className="text-xl font-bold">Thông tin người đặt</Text>
          <View className="m-3">
            <TextInputComponent
              value={fullName}
              onChangeText={setFullName}
              label="Họ và tên"
            />
          </View>

          <View className="m-3">
            <TextInputComponent
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              label="Số Điện thoại"
            />
          </View>

          <DefaultButton
            title="Đặt trước"
            disabled={!isChoosenTime}
            onPress={handleBookingPress}
          />
        </View>
        <ModalComponent
          fields={fields}
          modalVisible={modalVisible}
          onPress={handleConfirmPress}
          setModalVisible={setModalVisible}
        />
      </View>
    </ScrollView>
  );
}
