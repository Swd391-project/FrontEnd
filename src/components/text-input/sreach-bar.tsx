import React, { useState } from "react";

import { Searchbar } from "react-native-paper";

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Searchbar
      className="m-3"
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
}
