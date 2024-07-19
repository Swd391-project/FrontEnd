import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

import { useAuth } from "../../app/context/auth-context";
import { getRequest, getRequestImage } from "../helpers/api-requests";
import DefaultButton from "../components/button";

type Booking = {
  id: number;
  code: string | null;
  date: string;
  status: string;
  "from-time": string;
  "to-time": string;
  "total-cost": number;
  court: {
    "court-group": {
      name: string;
      "profile-image": string;
    };
  };
};

export default function BookingHistory() {
  const { authState } = useAuth();

  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);
  const [imageUrls, setImageUrls] = useState<{
    [key: number]: string | null | undefined;
  }>({});
  const [totalPages, setTotalPages] = useState(0);

  const fetchCourts = async (page: number = 1, query: string = "") => {
    try {
      const response = await getRequest(
        `/booking/user-booking/${authState?.user?.id}?page-number=${page}`,
      );
      const { data, headers } = response;
      setBookingHistory(data);

      const urls = await Promise.all(
        data.map(async (booking: Booking) => {
          const imageUrl = await getImageUrl(
            booking.court["court-group"]["profile-image"],
          );
          return imageUrl;
        }),
      );

      const imageUrlsMap: { [key: number]: string | null | undefined } = {};
      data.forEach((booking: Booking, index: number) => {
        imageUrlsMap[booking.id] = urls[index];
      });
      setImageUrls(imageUrlsMap);
      setTotalPages(headers.TotalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, [authState?.user?.id]);

  const getImageUrl = async (courtImage: string): Promise<string | null> => {
    try {
      const imageUrl = await getRequestImage(courtImage);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  if (!authState?.authenticated) {
    return <Text>Need login</Text>;
  }

  return (
    <ScrollView>
      <View className="bg-amber-400">
        <Text className="text-2xl font-bold text-brown-700 text-center mb-3 mt-4">
          Lịch sử đặt sân
        </Text>

        {bookingHistory.map((booking) => (
          <View
            className="bg-white m-2 p-2 pb-4 border-4 flex-row justify-between flex-wrap"
            key={booking.id}
          >
            <View className="flex-1 mr-2">
              <Text className="text-xl font-bold mb-2 mt-2 flex-shrink">
                Sân: {booking.court["court-group"].name}
              </Text>
              <Text>Ngày đặt: {booking.date}</Text>
              <Text>
                Thời gian: {booking["from-time"]} - {booking["to-time"]}
              </Text>
              <Text>Tổng chi phí: {booking["total-cost"]} VNĐ</Text>
              <Text>Trạng thái: {booking.status}</Text>
            </View>

            <View className="flex-shrink-0">
              {imageUrls[booking.id] !== undefined &&
                imageUrls[booking.id] !== null && (
                  <Image
                    source={{ uri: imageUrls[booking.id] as string }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
