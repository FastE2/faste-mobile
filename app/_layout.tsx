import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { TouchableOpacity } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
   const router = useRouter();

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen
          name="setting"
          options={{
            title: "Setting",
            headerBackTitle: "Back",
            headerRight: () => {
              return (
                <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => router.push('/chat')}>
                  <IconSymbol name="message" size={24} color="blue" />
                </TouchableOpacity>
              );
            },
          }}
        />
        <Stack.Screen
          name="chat"
          options={{ title: "Chat", headerBackTitle: "Back" }}
        />
        <Stack.Screen
          name="cart"
          options={{ title: "Cart", headerBackTitle: "Back" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
