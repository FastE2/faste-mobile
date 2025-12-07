import { IconSymbol } from "@/components/ui/icon-symbol";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

const orderAction = [
  {
    status: "Chờ xác nhận",
    icon: "checklist",
  },
  {
    status: "Chờ lấy hàng",
    icon: "shippingbox",
  },
  {
    status: "Chờ giao hàng",
    icon: "box.truck",
  },
  {
    status: "Đánh giá",
    icon: "star",
  },
];

const suportAction = [
  {
    status: "Trung tâm trợ giúp",
    icon: "checklist",
  },
  {
    status: "Trò chuyện với FastE",
    icon: "shippingbox",
  },
  {
    status: "Blog FastE",
    icon: "box.truck",
  },
];

export default function MeScreen() {
  return (
    <View className="flex-1">
      <SafeAreaView className="bg-blue-400">
        <View className="flex-row items-center justify-between py-2">
          <View className="flex flex-row items-center bg-white p-2 rounded-r-xl">
            {/* Thêm margin-right (mr) cho IconSymbol đầu tiên */}
            <View className="mr-2">
              <IconSymbol size={20} name="storefront" color="#000" />
            </View>

            {/* Thêm margin-right (mr) cho Text */}
            <Text className="text-black mr-2">Bắt đầu bán</Text>

            {/* IconSymbol cuối cùng không cần margin-right */}
            <IconSymbol size={20} name="arrow.2.circlepath" color="#000" />
          </View>

          <View className="flex-row items-center w-auto pr-2">
            <Link href="/setting" asChild>
              <Pressable className="p-2 rounded-full bg-white/80 mr-2">
                <IconSymbol size={20} name="seal" color="#000" />
              </Pressable>
            </Link>
            <Link href="/cart" asChild>
              <Pressable className="p-2 rounded-full bg-white/80 mr-2">
                <IconSymbol size={20} name="cart" color="#000" />
              </Pressable>
            </Link>

            <Link href="/chat" asChild>
              <Pressable className="p-2 rounded-full bg-white/80">
                <IconSymbol size={20} name="message" color="#000" />
              </Pressable>
            </Link>
          </View>
        </View>
        <View className="p-4 flex flex-row items-center space-x-4">
          {/* Avatar */}
          <View>
            <Image
              source={{ uri: "https://i.pravatar.cc/50?img=14" }}
              className="w-12 h-12 rounded-full"
            />
          </View>

          {/* User info */}
          <View className="flex flex-col justify-between">
            <Text className="text-xl font-medium text-white">user1</Text>
            <Text className="text-gray-300">0 Người theo dõi</Text>
          </View>

          {/* Stats */}
          <View className="flex flex-col justify-between">
            <Text className="text-white">Bạc</Text>
            <Text className="text-gray-300">54 Đang theo dõi</Text>
          </View>
        </View>
      </SafeAreaView>
      <View className="bg-white p-4 mb-4">
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="font-medium">Đơn mua</Text>
          <Text>Xem lịch sử mua hàng</Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          {orderAction.map((action, index) => (
            <View key={index} className="flex flex-col items-center">
              <IconSymbol
                name={action.icon as any}
                size={24}
                color="blue"
                style={{ marginRight: 8 }}
              />
              <Text>{action.status}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="bg-white">
        <View>
          <Text className="text-lg px-2">Hỗ trợ</Text>
        </View>
        {suportAction.map((item, index) => (
          <View key={index} className={`flex flex-row items-center justify-between p-2 border-b border-gray-200 border`}>
            <View className="flex flex-row items-center">
              <IconSymbol
                name={item.icon as any}
                size={24}
                color="blue"
                style={{ marginRight: 8 }}
              />
              <Text>{item.status}</Text>
            </View>
            <IconSymbol
              name={"arrow.right"}
              size={24}
              color="blue"
              style={{ marginRight: 8 }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
