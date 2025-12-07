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
import { useAppState } from "@/hooks/useAppState";
import { useOnlineManager } from "@/hooks/useOnlineManager";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppStateStatus, Platform, TouchableOpacity } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });
  useOnlineManager();
  useAppState(onAppStateChange);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              animation: "slide_from_left",
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="product/[slugId]"
            options={{ headerShown: false }}
          />
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
                  <TouchableOpacity
                    style={{ marginLeft: 16 }}
                    onPress={() => router.push("/chat")}
                  >
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
    </QueryClientProvider>
  );
}
