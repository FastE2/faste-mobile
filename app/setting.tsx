import {
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  Lock,
  LucideIcon,
  MapPin,
  MessageCircle,
  Star,
  User,
  Users,
  X,
} from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SettingItemProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

interface SettingGroupProps {
  title?: string;
  children: React.ReactNode;
}

const SettingItem = ({
  icon: Icon,
  title,
  subtitle,
  onPress,
}: SettingItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between py-4 border-b border-gray-100"
  >
    <View className="flex-row items-center">
      {/* Icon bên trái (tùy chọn) */}
      {Icon && <Icon size={20} color="#333" className="mr-3" />}
      <Text className="text-base text-gray-800">{title}</Text>
    </View>
    <View className="flex-row items-center">
      {subtitle && (
        <Text className="text-sm text-gray-500 mr-2">{subtitle}</Text>
      )}
      <ChevronRight size={18} color="#9ca3af" />
    </View>
  </TouchableOpacity>
);

const SettingGroup = ({ title, children }: SettingGroupProps) => (
  <View className="mb-4 px-4 ">
    {title && (
      <Text className="text-xs font-semibold text-gray-500 uppercase mt-4 mb-2">
        {title}
      </Text>
    )}
    <View className="bg-white">{children}</View>
  </View>
);

const SettingsScreen = () => {
  const handlePress = (item: any) => {
    console.log(`Đã nhấn: ${item}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}

      <ScrollView className="flex-1">
        {/* 1. Tài khoản của tôi */}
        <SettingGroup title="Tài khoản của tôi">
          <SettingItem
            title="Tài khoản & Bảo mật"
            icon={Lock}
            onPress={() => handlePress("Tài khoản & Bảo mật")}
          />
          <SettingItem
            title="Địa Chỉ"
            icon={MapPin}
            onPress={() => handlePress("Địa Chỉ")}
          />
          <SettingItem
            title="Tài khoản / Thẻ ngân hàng"
            icon={CreditCard}
            onPress={() => handlePress("Tài khoản / Thẻ ngân hàng")}
          />
        </SettingGroup>
        <View className="h-2 bg-gray-50" />
        {/* 2. Cài đặt */}
        <SettingGroup title="Cài đặt">
          <SettingItem
            title="Cài đặt Chat"
            icon={MessageCircle}
            onPress={() => handlePress("Cài đặt Chat")}
          />
          <SettingItem
            title="Cài đặt Thông báo"
            icon={Bell}
            onPress={() => handlePress("Cài đặt Thông báo")}
          />
          <SettingItem
            title="Cài đặt riêng tư"
            icon={Lock}
            onPress={() => handlePress("Cài đặt riêng tư")}
          />
          <SettingItem
            title="Người dùng đã bị chặn"
            icon={Users}
            onPress={() => handlePress("Người dùng đã bị chặn")}
          />
          <SettingItem
            title="Ngôn ngữ / Language"
            subtitle="Tiếng Việt"
            icon={Globe}
            onPress={() => handlePress("Ngôn ngữ / Language")}
          />
        </SettingGroup>
        <View className="h-2 bg-gray-50" />
        {/* 3. Hỗ trợ */}
        <SettingGroup title="Hỗ trợ">
          <SettingItem
            title="Trung tâm hỗ trợ"
            icon={HelpCircle}
            onPress={() => handlePress("Trung tâm hỗ trợ")}
          />
          <SettingItem
            title="Tiêu chuẩn cộng đồng"
            icon={FileText}
            onPress={() => handlePress("Tiêu chuẩn cộng đồng")}
          />
          <SettingItem
            title="Điều khoản Shopee"
            icon={FileText}
            onPress={() => handlePress("Điều khoản Shopee")}
          />
          <SettingItem
            title="Hài lòng với Shopee? Hãy đánh giá ngay!"
            icon={Star}
            onPress={() => handlePress("Đánh giá")}
          />
          <SettingItem
            title="Giới thiệu"
            icon={User}
            onPress={() => handlePress("Giới thiệu")}
          />
          <SettingItem
            title="Yêu cầu hủy tài khoản"
            icon={X}
            onPress={() => handlePress("Yêu cầu hủy tài khoản")}
          />
        </SettingGroup>
        <View className="h-6" /> {/* Khoảng cách cuối cùng */}
      </ScrollView>

      {/* Nút Đăng xuất */}
      <TouchableOpacity
        onPress={() => handlePress("Đăng xuất")}
        className="bg-orange-500 p-4 mx-4 mb-4 rounded-lg shadow-sm"
      >
        <Text className="text-center text-white text-lg font-bold">
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingsScreen;
