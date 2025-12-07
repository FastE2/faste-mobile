import { LoginBodyType, loginSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";


export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginBodyType) => {
    setLoading(true);
    try {
      console.log("Login with", data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
        <View className="flex-1 justify-center">
          {/* Title */}
          <Text className="text-3xl font-bold mb-8 text-center">
            Welcome Back
          </Text>

          {/* Email */}
          <View className="mb-4">
            <Text className="text-base mb-2 font-medium">Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                  placeholder="example@gmail.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 mt-1">{errors.email.message}</Text>
            )}
          </View>

          {/* Password */}
          <View className="mb-4">
            <Text className="text-base mb-2 font-medium">Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                  placeholder="••••••••"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          {/* Login Button */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            className={`bg-black py-4 rounded-xl mt-4 ${loading ? "opacity-50" : ""}`}
          >
            <Text className="text-center text-white text-base font-semibold">
              {loading ? "Loading..." : "Login"}
            </Text>
          </Pressable>

          {/* Forgot password */}
          <Pressable className="mt-4">
            <Link href={'/forgot-password'} className="text-center text-gray-600">
              Forgot your password?
            </Link>
          </Pressable>

          {/* Divider */}
          <View className="my-6 flex-row items-center">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-3 text-gray-500">OR</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          {/* Social Login */}
          <Pressable className="border border-gray-300 py-3 rounded-xl mb-3">
            <Text className="text-center">Continue with Google</Text>
          </Pressable>

          <Pressable className="border border-gray-300 py-3 rounded-xl">
            <Text className="text-center">Continue with Facebook</Text>
          </Pressable>

          {/* Signup */}
          <Pressable className="mt-8 mb-10">
            <Text className="text-center text-gray-700">
              Don&apos;t have an account?{" "}
              <Link href={'/register'} className="font-semibold">Sign Up</Link>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
