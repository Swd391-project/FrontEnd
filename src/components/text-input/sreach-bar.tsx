import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchInput({ onSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Searchbar
      className="m-3 bg-white"
      placeholder="Tìm kiếm"
      onChangeText={handleSearch}
      value={searchQuery}
    />
  );
}
