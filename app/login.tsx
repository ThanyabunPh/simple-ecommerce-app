// app/login.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Content from "@/components/Content/Content";
import useAuthStore from "@/store/useAuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";

const Login = () => {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Validation Error", "Email is required.");
      return;
    }
    if (!password) {
      Alert.alert("Validation Error", "Password is required.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    try {
      await login(email, password);
      router.replace("/(app)");
    } catch (err) {
      setError("Login failed. Please check your email or password.");
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <Content>
      <View className="justify-around flex-1 items-center">
        <Text className="text-2xl font-bold">Login Page</Text>
        <View className="w-full py-5 justify-between">
          <View className="mb-3 flex-row items-center border-2 border-gray-300 rounded-md p-2">
            <Ionicons name="mail" size={24} color="black" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="flex-1 p-2"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View className="mb-3 flex-row items-center border-2 border-gray-300 rounded-md p-2">
            <Ionicons name="key" size={24} color="black" />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              className="flex-1 p-2"
              secureTextEntry
            />
          </View>
          {error && <Text className="text-red-500 text-center">{error}</Text>}
        </View>

        {isLoading && <ActivityIndicator size={25} />}

        <View className="w-full">
          <TouchableOpacity
            activeOpacity={0.5}
            className="bg-amber-500 p-5 justify-center items-center rounded-md w-full"
            onPress={handleLogin}
          >
            <Text className="text-lg font-bold text-white">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            className="p-5 mt-3 justify-center items-center rounded-md w-full border-2 border-gray-300"
            onPress={handleRegister}
          >
            <Text className="text-lg font-bold text-black">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Content>
  );
};

export default Login;
