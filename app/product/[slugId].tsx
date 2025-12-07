import { IconSymbol } from "@/components/ui/icon-symbol";
import { getDetailProductPublicBySlug } from "@/services/product.service";
import {
  Link,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";

export default function ProductDetailScreen() {
  const [detail, setDetail] = useState<any>(null);
  const { slugId } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const fetchDetailProduct = async (slugId: string) => {
    const res = await getDetailProductPublicBySlug(slugId);
    if (res.status === "success") {
      console.log("DATATATATATT", res.data);
      setDetail(res.data.data);
    }
  };

  useEffect(() => {
    if (slugId) {
      fetchDetailProduct(slugId as string);
    }
  }, [slugId]);

  if (!detail)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Không tìm thấy sản phẩm</Text>
      </View>
    );

  // if (!detail) {
  //   return (
  //     <View className="flex-1 justify-center items-center">
  //       <Text>Không tìm thấy sản phẩm</Text>
  //     </View>
  //   );
  // }

  return (
    <>
      <SafeAreaView className="bg-blue-400">
        <View className="flex flex-row items-center justify-between px-4 py-2">
          <Pressable className="w-16" onPress={() => router.push("/")}>
            <View className="">
              <ChevronLeft />
            </View>
          </Pressable>
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

          <View className="w-30 flex-row items-center justify-between ml-3">
            <Link href="/chat" asChild>
              <Pressable className="p-2 rounded-full bg-white/80">
                <IconSymbol size={20} name="shared.with.you" color="#000" />
              </Pressable>
            </Link>
            <Link href="/cart" asChild className="ml-2">
              <Pressable className="p-2 rounded-full bg-white/80 mr-2">
                <IconSymbol size={20} name="cart" color="#000" />
              </Pressable>
            </Link>
          </View>
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white">
        <View className="flex-1 bg-gray-100">
          <ScrollView className="flex-1">
            {/* Product Image */}
            <View className="h-96 overflow-hidden w-full">
              <Image
                source={{
                  uri:
                    detail.images[0] ||
                    "/assets/images/android-icon-background.png",
                }}
                className="w-full h-full bg-gray-200 object-cover"
                resizeMode="cover"
              />
            </View>
            <View className="p-4 bg-white shadow-sm space-y-2">
              <Text className="text-xl font-bold">{detail.name}</Text>
              <Text className="text-red-500 font-bold text-lg">
                {detail.basePrice.toLocaleString()}₫
              </Text>

              <Text className="text-sm text-gray-500">
                {detail.rating} ★ ({detail.ratingCount} đánh giá)
              </Text>
            </View>
            {/* Shop */}
            <View className="bg-white mt-3 p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Image
                  source={{ uri: detail.shop.logo }}
                  className="w-12 h-12 rounded-full"
                />
                <View>
                  <Text className="font-semibold">{detail.shop.name}</Text>
                  <Text className="text-xs text-gray-500">
                    {detail.shop.addressShip?.city}
                  </Text>
                </View>
              </View>

              <TouchableOpacity className="px-3 py-1 border border-red-400 rounded-lg">
                <Text className="text-xs text-red-500">Xem shop</Text>
              </TouchableOpacity>
            </View>
            {/* Description */}
            <View className="bg-white mt-3 p-4 space-y-2">
              <Text className="font-semibold text-sm">Mô tả</Text>
              <RenderHTML
                contentWidth={width}
                source={{ html: detail.description }}
              />
            </View>
            <View className="h-20" /> {/* spacing để không bị che */}
          </ScrollView>
        </View>
      </View>

      {/* Bottom Action Bar */}
      <View className="flex-row items-center justify-between max-h-20  pb-6 border-t border-gray-300 bg-white">
        {/* Chat ngay */}
        <TouchableOpacity className="flex-col items-center py-2 px-4">
          <IconSymbol name="message" size={24} color="black" />
          <Text className="text-sm mt-1">Chat ngay</Text>
        </TouchableOpacity>
        <View className="w-[1px] h-10 bg-gray-200">{""}</View>
        {/* Thêm giỏ hàng */}
        <TouchableOpacity className="flex-col items-center py-2 px-4">
          <IconSymbol name="cart" size={24} color="black" />
          <Text className="text-sm mt-1">Thêm vào giỏ hàng</Text>
        </TouchableOpacity>

        {/* Mua ngay */}
        <TouchableOpacity className="flex-1 bg-red-500 flex items-center justify-center h-full">
          <Text className="text-center text-white font-semibold text-base">
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
