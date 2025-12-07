// secure-storage.ts
import { KEY_STORAGE } from '@/constants/key-storage';
import * as SecureStore from 'expo-secure-store';

export const setToken = async (token: string) => {
  await SecureStore.setItemAsync(KEY_STORAGE.ACCESS_TOKEN, token);
};
