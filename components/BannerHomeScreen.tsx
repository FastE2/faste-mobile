import React from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

const banners = [
  "https://picsum.photos/id/1018/800/400",
  "https://picsum.photos/id/1025/800/400",
  "https://picsum.photos/id/1033/800/400",
];

export default function BannerHomeScreen() {
  return (
    <View className="w-full h-40 z-0">
      <Carousel
        width={width}
        height={160}
        autoPlay={true}
        autoPlayInterval={3000}
        data={banners}
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            className="w-full h-full"
            style={{ resizeMode: "cover" }}
          />
        )}
      />
    </View>
  );
}
