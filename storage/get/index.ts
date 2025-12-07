import { KEY_STORAGE } from "@/constants/key-storage";
import * as SecureStore from "expo-secure-store";

export const getToken = async () => {
  return await SecureStore.getItemAsync(KEY_STORAGE.ACCESS_TOKEN);
};
