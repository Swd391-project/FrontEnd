import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import BadmintonCourtCard from "../components/card";
import SearchInput from "../components/text-input/sreach-bar";
import { getRequest } from "../helpers/api-requests";
import { useAuth } from "../../app/context/auth-context";
import { Court } from "../constants/types/court";
import { isManager } from "../helpers/roles-check";
import Pagination from "../components/pagination";

import { RootStackParamList } from "../constants/types/root-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const { authState } = useAuth();
  const isAllowedToAddCourt = isManager(authState?.user?.role);

  const navigation = useNavigation<NavigationProp>();

  const [court, setCourt] = useState<Court[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCourts = async (page: number = 1, query: string = "") => {
    try {
      const response = await getRequest(
        `/court-group?page-number=${page}&search-name=${query}`,
      );
      const { data, headers } = response;
      setCourt(data);
      setTotalPages(headers.TotalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleAddNewCourtPress = () => {
    navigation.navigate("AddNewCourt", { onSuccess: fetchCourts });
  };

  const handlePageChange = (page: number) => {
    fetchCourts(page, searchQuery);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchCourts(1, query);
  };

  return (
    <ScrollView>
      <View className="bg-amber-400">
        <Text className="text-2xl font-bold text-brown-700 text-center mb-3 mt-4">
          Danh sách
        </Text>
        <SearchInput onSearch={handleSearch} />
        {isAllowedToAddCourt && (
          <View
            style={{ alignItems: "flex-end", marginRight: 15, marginTop: 10 }}
          >
            <TouchableOpacity onPress={handleAddNewCourtPress}>
              <MaterialIcons name="library-add" size={30} color="black" />
            </TouchableOpacity>
          </View>
        )}
        <View className="flex-1">
          {court.map((court, index) => (
            <BadmintonCourtCard
              onSuccess={fetchCourts}
              key={index}
              court={court}
            />
          ))}
        </View>
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      </View>
    </ScrollView>
  );
}
