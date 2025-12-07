import { Link } from "expo-router";
import React, { useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";

// Format tiền đơn giản
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

// ⭐ Rating đơn giản
const RatingStars = ({ value = 0 }) => (
  <View className="flex-row">
    {Array.from({ length: 5 }).map((_, i) => (
      <Text key={i} className={`text-yellow-500 text-[12px]`}>
        {i < value ? "★" : "☆"}
      </Text>
    ))}
  </View>
);

interface CartProductProps {
  data: any;
}

export default function CartProduct({ data }: CartProductProps) {
  const [loaded, setLoaded] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleImageLoaded = () => {
    setLoaded(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Link href={`/`} asChild>
      <Pressable
        className={`bg-white rounded-lg overflow-hidden border border-gray-200 w-50 h-80`}
      >
        {/* Skeleton khi load ảnh */}
        {!loaded && (
          <View className="w-full h-[190px] bg-gray-300 absolute top-0 left-0" />
        )}

        {/* Ảnh sản phẩm */}
        <Animated.Image
          source={{
            uri: data.images?.[0] || "/assets/images/android-icon-background.png",
          }}
          className="w-full h-[190px]"
          style={{
            opacity: fadeAnim,
          }}
          onLoad={handleImageLoaded}
          resizeMode="cover"
        />

        {/* Info */}
        <View className="p-2 gap-y-1">
          <Text className="text-sm" numberOfLines={2}>
            {data.name}
          </Text>

          {/* Giá + Discount */}
          <View className="flex-row items-center gap-x-1">
            <Text className="text-[#EE4D2D] text-base">
              {data?.skus?.length
                ? formatCurrency(data.skus[0].price)
                : formatCurrency(data.basePrice ?? 0)}
            </Text>

            <View className="bg-[#FEEEEA] px-1 py-0.5 rounded">
              <Text className="text-[#EE4D2D] text-[10px]">-39%</Text>
            </View>
          </View>

          {/* Rating */}
          <RatingStars value={data.rating ?? 0} />
        </View>
      </Pressable>
    </Link>
  );
}
