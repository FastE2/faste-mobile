import { emailSchema, registerSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

// -------------- Schemas --------------

// -------------- Component --------------
export default function RegisterScreen() {
  const [step, setStep] = useState<1 | 2>(1); // Step 1: email, Step 2: register form
  const [email, setEmail] = useState("");

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // -------------- Step 1: Send OTP --------------
  const onSubmitEmail = async (data: { email: string }) => {
    try {
      // Gọi API gửi OTP
      // await axios.post("https://api.example.com/send-otp", {
      //   email: data.email,
      // });
      Alert.alert("OTP đã gửi đến email của bạn");
      setEmail(data.email);
      setStep(2); // sang step nhập thông tin
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.message || "Lỗi gửi OTP");
    }
  };

  // -------------- Step 2: Register --------------
  const onSubmitRegister = async (data: any) => {
    try {
      await axios.post("https://api.example.com/register", {
        email,
        name: data.name,
        phoneNumber: data.phoneNumber,
        password: data.password,
        code: data.code,
      });
      Alert.alert("Đăng ký thành công!");
      // TODO: điều hướng sang login hoặc home
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="flex-1 justify-center">
          {/* --- Step 1: Email --- */}
          {step === 1 && (
            <>
              <Text className="text-3xl font-bold mb-8 text-center">
                Register
              </Text>
              <Text className="text-base mb-2 font-medium">Email</Text>
              <Controller
                control={emailControl}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="example@gmail.com"
                    className="border border-gray-300 rounded-xl px-4 py-3 text-base mb-1"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {emailErrors.email && (
                <Text className="text-red-500 mb-4">
                  {emailErrors.email.message}
                </Text>
              )}

              <Pressable
                onPress={handleEmailSubmit(onSubmitEmail)}
                className="bg-black py-4 rounded-xl mt-4"
              >
                <Text className="text-center text-white text-base font-semibold">
                  Send OTP
                </Text>
              </Pressable>
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
            </>
          )}

          {/* --- Step 2: Register Form --- */}
          {step === 2 && (
            <>
              <Text className="text-3xl font-bold mb-8 text-center">
                Complete Registration
              </Text>

              {/* OTP */}
              <View className="mb-4">
                <Text className="text-base mb-2 font-medium">OTP Code</Text>
                <Controller
                  control={control}
                  name="code"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="6-digit code"
                      className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.code && (
                  <Text className="text-red-500 mt-1">
                    {errors.code.message}
                  </Text>
                )}
              </View>

              {/* Name */}
              <View className="mb-4">
                <Text className="text-base mb-2 font-medium">Full Name</Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="John Doe"
                      className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.name && (
                  <Text className="text-red-500 mt-1">
                    {errors.name.message}
                  </Text>
                )}
              </View>

              {/* Phone */}
              <View className="mb-4">
                <Text className="text-base mb-2 font-medium">Phone Number</Text>
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="+84 912 345 678"
                      className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                      keyboardType="phone-pad"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <Text className="text-red-500 mt-1">
                    {errors.phoneNumber.message}
                  </Text>
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
                      placeholder="••••••••"
                      className="border border-gray-300 rounded-xl px-4 py-3 text-base"
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

              {/* Confirm Password */}
              <View className="mb-4">
                <Text className="text-base mb-2 font-medium">
                  Confirm Password
                </Text>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="••••••••"
                      className="border border-gray-300 rounded-xl px-4 py-3 text-base"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text className="text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              {/* Submit */}
              <Pressable
                onPress={handleSubmit(onSubmitRegister)}
                className="bg-black py-4 rounded-xl mt-4"
              >
                <Text className="text-center text-white text-base font-semibold">
                  Register
                </Text>
              </Pressable>
            </>
          )}
          <Text className="mt-8 text-sm text-center text-gray-500">
            By signing up, you agree to our{" "}
            <Text
              className="text-blue-500 underline"
              onPress={() => console.log("Terms pressed")}
            >
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text
              className="text-blue-500 underline"
              onPress={() => console.log("Privacy pressed")}
            >
              Privacy Policy
            </Text>
          </Text>
          <Pressable className="mt-8 mb-10">
            <Text className="text-center text-gray-700">
              Already have an account?{" "}
              <Link href={"/login"} className="font-semibold">
                Sign in now
              </Link>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
