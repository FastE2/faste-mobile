import { KEY_STORAGE } from "@/constants/key-storage";
import * as SecureStore from "expo-secure-store";

export const clearToken = async () => {
  return await SecureStore.deleteItemAsync(KEY_STORAGE.ACCESS_TOKEN);
};
