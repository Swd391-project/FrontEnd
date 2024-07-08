import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";

export type PaginationProp = {
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalPages,
  onPageChange,
}: PaginationProp) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  return (
    <View className="flex-row justify-between items-center px-20 my-10'">
      <Button
        title="Trước"
        onPress={goToPreviousPage}
        disabled={currentPage === 1}
      />
      <Text className="text-base font-bold">
        Trang {currentPage}/{totalPages}
      </Text>
      <Button
        title="Sau"
        onPress={goToNextPage}
        disabled={currentPage === totalPages}
      />
    </View>
  );
}
