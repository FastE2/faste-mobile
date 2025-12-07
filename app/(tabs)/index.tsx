import { IconSymbol } from "@/components/ui/icon-symbol";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Sticky Header */}
      <View className="h-30 flex-row items-center justify-between px-4 pt-14 pb-4 bg-blue-400 border-b border-gray-200 z-50">
        <TextInput
          placeholder="Enter your name"
          className="border border-gray-300 rounded-xl px-3 py-2 w-[80%]"
        />
        <View className="flex-row items-center justify-center gap-x-4 flex-1">
          <Link href={"/cart"}>
            <IconSymbol size={28} name={"cart"} color={"white"} />
          </Link>
          <Link href={"/chat"}>
            <IconSymbol size={28} name={"message"} color={"white"} />
          </Link>
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <View key={i} className="p-4 mb-4 bg-gray-100 rounded-lg">
            <Text>Item {i + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
