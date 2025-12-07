import BannerHomeScreen from "@/components/BannerHomeScreen";
import CartProduct from "@/components/CartProduct";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Link } from "expo-router";
import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";

export const mockProduct = Array.from({ length: 20 }).map((_, i) => ({
  slugId: `nike-${i}`,
  name: "Nike Air Force 1 Shadow Women Premium 2024 – Full White",
  images: [
    "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
  ],
  rating: 4.5,
  basePrice: 2350000,
  skus: [
    {
      id: "sku-1",
      price: 2199000,
      size: "36",
      stock: 12,
    },
  ],
}));

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Sticky Header */}
      <SafeAreaView className="bg-blue-500 z-50 sticky top-0">
        <View className="flex-row items-center px-4 py-2 border-b border-blue-600">
          <View className="flex-1">
            <View className="absolute left-1 top-2 z-10">
              <IconSymbol size={20} name="magnifyingglass" color="#ccc" />
            </View>
            <TextInput
              placeholder="Search…"
              placeholderTextColor="#ccc"
              className="flex-1 bg-white/90 rounded-md pl-8 py-2 text-base relative"
            />
          </View>

          <View className="flex-row items-center ml-3">
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
      </SafeAreaView>

      <FlatList
        data={mockProduct}
        keyExtractor={(item) => item.slugId}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 12 }}
        ListHeaderComponent={
          <View className="mb-4">
            <BannerHomeScreen />
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ flex: 1, paddingHorizontal: 8, paddingBottom: 16 }}>
            <CartProduct data={item} />
          </View>
        )}
      />
    </View>
  );
}
