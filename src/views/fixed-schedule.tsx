import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../constants/types/root-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RNPickerSelect from "react-native-picker-select";

import { useAuth } from "../../app/context/auth-context";
import ModalComponent from "../components/modal";
import DefaultButton from "../components/button";
import { months } from "../constants/months";
import { getRequest } from "../helpers/api-requests";
import TimeBooking from "../components/choose-time-booking";
import SelectButton from "../components/button/select-button";
import TextInputComponent from "../components/text-input";
import formatCurrency from "../helpers/price-format";
import { getVietnameseDay } from "../helpers/translate-day";
import SplashScreen from "./splash-screen";

import { Court } from "../constants/types/court";
import { phoneRegex } from "../helpers/regex";

export type CourtDetailRouteProp = RouteProp<
  RootStackParamList,
  "FixedSchedule"
>;
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type CourtProps = {
  route: CourtDetailRouteProp;
};

export default function FixedSchedule({ route }: CourtProps) {
  const { courtId } = route.params;

  const { authState } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const [fullName, setFullName] = useState<string>(
    authState?.user ? authState.user["full-name"] : "",
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    authState?.user ? authState.user["phone-number"] : "",
  );
  const [court, setCourt] = useState<Court>();
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [isChoosenTime, setIsChoosenTime] = useState(false);
  const [time, setTime] = useState<string[]>([]);
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToime] = useState<string>("");
  const [weekdays, setWeekdays] = useState<
    Array<{ "activity-status": string; id: number; weekday: string }>
  >([]);
  const [selectedWeekdDays, setSelectedWeekDays] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);

  const currentYear = new Date().getFullYear();
  const futureYears = Array.from({ length: 5 }, (_, i) => ({
    label: (currentYear + i).toString(),
    value: (currentYear + i).toString(),
  }));

  useEffect(() => {
    getRequest(`/court-group/${courtId}`)
      .then(({ data }) => {
        setCourt(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    getRequest(`/court-group/fixed-booking-page/${courtId}`)
      .then(({ data }) => {
        setTime(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedMonth && selectedYear && fromTime) {
      getRequest(
        `/court-group/fixed-booking-page/check-days-of-week/${courtId}?Month=${selectedMonth}&Year=${selectedYear}&from-time=${fromTime}&to-time=${toTime}`,
      )
        .then(({ data }) => {
          setWeekdays(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedMonth, selectedYear, fromTime, toTime]);

  const toggleDaySelection = (dayName: string) => {
    const isSelected = selectedWeekdDays.includes(dayName);
    if (isSelected) {
      setSelectedWeekDays(selectedWeekdDays.filter((name) => name !== dayName));
    } else {
      setSelectedWeekDays([...selectedWeekdDays, dayName]);
    }
  };

  const handleBookingPress = () => {
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Số điện thoại không hợp lệ.");
    } else {
      setPhoneError(undefined);
    }
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
    navigation.navigate("ConfirmFixedBooking", {
      fullName,
      phoneNumber,
      courtId,
      courtName: court!.name,
      courtAddress: court!.address,
      month: selectedMonth,
      year: selectedYear,
      weekdays: selectedWeekdDays,
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
    },
    {
      id: "phone",
      label: `Số điện thoại: ${phoneNumber}`,
    },
    {
      id: "courtName",
      label: `Tên sân ${court.name}`,
    },

    {
      id: "address",
      label: `Địa chỉ ${court.address}`,
    },
    {
      id: "time",
      label: `Từ ${fromTime} giờ đến ${toTime} giờ (${totalHours} giờ)`,
    },
    {
      id: "date",
      label: `Các ngày: ${getVietnameseDay(selectedWeekdDays)} hàng tuần`,
    },

    {
      id: "price",
      label: `Tổng tiền: ${formatCurrency(totalPrice)}`,
    },
  ];

  return (
    <ScrollView className="bg-amber-400">
      <View>
        <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
          <Text className="font-bold text-lg">Sân: {court.name}</Text>
          <Text className="text-base mb-1">Địa chỉ: {court.address}</Text>
          <Text className="text-base mb-1">Trạng thái: {court.status}</Text>
          <Text className="text-base mb-1">Đánh giá: {court.rate}</Text>
          <Text className="text-base mb-1">Giá tiền: {court.price}</Text>
        </View>

        <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
          <View className="m-3">
            <Text className="text-xl font-bold">Chọn tháng:</Text>
            <View className="m-3 rounded-lg border-solid border-2 border-purple-700">
              <RNPickerSelect
                placeholder={{ label: "Chọn tháng...", value: null }}
                items={months}
                onValueChange={(value) => setSelectedMonth(value)}
              />
            </View>
          </View>

          <View className="m-3">
            <Text className="text-xl font-bold">Chọn năm:</Text>
            <View className="m-3 rounded-lg border-solid border-2 border-purple-700">
              <RNPickerSelect
                placeholder={{ label: "Chọn năm...", value: null }}
                items={futureYears}
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              />
            </View>
          </View>
        </View>

        <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
          <Text className="text-xl font-bold">Chọn thời gian</Text>
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
          <Text className="text-xl font-bold">Chọn ngày chơi</Text>
          {weekdays.map((day) => (
            <SelectButton
              key={day.id}
              title={getVietnameseDay(day.weekday)}
              onPress={() => {
                toggleDaySelection(day.weekday);
              }}
              selected={selectedWeekdDays.includes(day.weekday)}
            ></SelectButton>
          ))}
        </View>

        <View className="bg-white p-5 m-2 rounded-lg shadow-sm">
          <Text className="text-xl font-bold">Thông tin người đặt</Text>
          <View className="m-3">
            <TextInputComponent
              value={fullName}
              onChangeText={setFullName}
              label="Họ và tên"
              errorMessage={
                !fullName ? "Họ và tên không được trống." : undefined
              }
            />
          </View>

          <View className="m-3">
            <TextInputComponent
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              label="Số Điện thoại"
              errorMessage={phoneError}
            />
          </View>

          <DefaultButton
            title="Đặt trước"
            disabled={
              selectedMonth === 0 ||
              selectedYear === 0 ||
              !isChoosenTime ||
              selectedWeekdDays.length === 0 ||
              !fullName
            }
            onPress={handleBookingPress}
          />
          <ModalComponent
            fields={fields}
            modalVisible={modalVisible}
            onPress={handleConfirmPress}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </ScrollView>
  );
}
