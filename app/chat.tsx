import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const mockChats = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/50?img=12",
    name: "phukienlucas",
    lastMessage: "🔥 SIÊU SALE 3️⃣2️⃣ Độc quyền tại gian hàng!",
    time: "Saturday",
    unread: 3,
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/50?img=13",
    name: "phukienkoreacase",
    lastMessage: "Những người mua đã mua Ốp lưng iphone T...",
    time: "Saturday",
    unread: 0,
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/50?img=14",
    name: "canifa_official",
    lastMessage: "🎉2/8-2/2 CANIFA sale toàn bộ sản phẩm...",
    time: "01/02",
    unread: 0,
  },
  // ... thêm dữ liệu mock khác
];

export default function Chat() {
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="mb-4">
            <View className="absolute left-3 top-2 z-10">
              <IconSymbol size={20} name="magnifyingglass" color="#ccc" />
            </View>
            <TextInput
              placeholder="Search…"
              placeholderTextColor="#ccc"
              className="flex-1 bg-gray-100/90 rounded-md pl-8 py-2 text-base relative mx-2"
            />
          </View>
        }
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-gray-200 ml-16" />
        )}
        renderItem={({ item }) => (
          <Pressable className="flex-row items-center px-4 py-3">
            {/* Avatar */}
            <Image
              source={{ uri: item.avatar }}
              className="w-12 h-12 rounded-full"
            />

            {/* Text */}
            <View className="flex-1 ml-3">
              <Text className="text-base font-semibold">{item.name}</Text>
              <Text
                className="text-sm text-gray-500 truncate"
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
            </View>

            {/* Time & Unread */}
            <View className="items-end justify-center">
              <Text className="text-xs text-gray-400">{item.time}</Text>
              {item.unread > 0 && (
                <View className="mt-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                  <Text className="text-xs text-white font-bold">
                    {item.unread}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
