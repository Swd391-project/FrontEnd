import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { styled } from "nativewind";

interface Court {
  id: number;
  name: string;
}

const courts: Court[] = [
  { id: 1, name: "Sân 1" },
  { id: 2, name: "Sân 2" },
];

const timeSlots: string[] = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
];
export default function CourtCalendar() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const toggleSlot = (slot: string) => {
    setSelectedSlot(slot === selectedSlot ? null : slot);
  };

  return (
    <View className="p-4">
      <FlatList
        data={courts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", marginBottom: 8 }}>
              {timeSlots.map((slot, index) => (
                <Pressable
                  key={index}
                  style={({ pressed }) => ({
                    flex: 1,
                    backgroundColor:
                      selectedSlot === slot
                        ? "#10B981"
                        : pressed
                        ? "#6B7280"
                        : "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                    marginHorizontal: 2,
                    paddingVertical: 6,
                  })}
                  onPress={() => toggleSlot(slot)}
                >
                  <Text
                    style={{
                      color: selectedSlot === slot ? "#FFFFFF" : "#000000",
                    }}
                  >
                    {slot}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}
