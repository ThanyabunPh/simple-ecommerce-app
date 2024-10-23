// context/useAuthStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useEffect } from "react";

interface AuthState {
  session: string | null;
  isLoading: boolean;
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  fetchSession: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userSession = userCredential.user.uid;
      await AsyncStorage.setItem("session", userSession);
      await AsyncStorage.setItem("email", userCredential.user.email as string);
      set({
        session: userSession,
        isLoading: false,
        user: userCredential.user.email,
      });
    } catch (error) {
      console.error("Registration error:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true });
    await AsyncStorage.removeItem("session");
    await AsyncStorage.removeItem("email");
    set({ isLoading: false });
  },
  register: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userSession = userCredential.user.uid;
      await AsyncStorage.setItem("session", userSession);
      await AsyncStorage.setItem("email", userCredential.user.email as string);
      set({
        session: userSession,
        isLoading: false,
        user: userCredential.user.email,
      });
    } catch (error) {
      console.error("Registration error:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  fetchSession: async () => {
    const session = await AsyncStorage.getItem("session");
    const user = await AsyncStorage.getItem("email");
    console.log("🚀 ~ fetchSession: ~ user:", user);
    set({ session: session, user: user });
  },
}));

export const useInitializeSession = () => {
  const fetchSession = useAuthStore((state) => state.fetchSession);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);
};

export default useAuthStore;
