import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  redirectRoute: string | null;
  setRedirectRoute: (route: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  loadStoredToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  redirectRoute: null,
  setRedirectRoute: (route: string) => {
    set({ redirectRoute: route });
  },
  login: async (email: string, password: string) => {
    try {
      const res = await axios.post("https://api.example.com/login", {
        email,
        password,
      });
      const { accessToken, user } = res.data;

      await SecureStore.setItemAsync("access_token", accessToken);

      set({ user, accessToken, isAuthenticated: true });
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Login failed");
    }
  },

  register: async (data: any) => {
    try {
      const res = await axios.post("https://api.example.com/register", data);
      const { accessToken, user } = res.data;

      await SecureStore.setItemAsync("access_token", accessToken);
      set({ user, accessToken, isAuthenticated: true });
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || "Register failed");
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("access_token");
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  loadStoredToken: async () => {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      try {
        const res = await axios.get("https://api.example.com/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ user: res.data, accessToken: token, isAuthenticated: true });
      } catch {
        await SecureStore.deleteItemAsync("access_token");
        set({ user: null, accessToken: null, isAuthenticated: false });
      }
    }
  },
}));
