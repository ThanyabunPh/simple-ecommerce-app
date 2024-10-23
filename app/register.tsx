// app/register.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import Content from "@/components/Content/Content";
import Ionicons from "@expo/vector-icons/Ionicons";

const Register = () => {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!email) {
      Alert.alert("Validation Error", "Email is required.");
      return;
    }
    if (!password) {
      Alert.alert("Validation Error", "Password is required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }

    try {
      await register(email, password);
      router.replace("/(app)");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Content>
      <View className="flex-1 justify-around items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-10 left-5"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Register</Text>
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
          <View className="mb-3 flex-row items-center border-2 border-gray-300 rounded-md p-2">
            <Ionicons name="key" size={24} color="black" />
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
            onPress={handleRegister}
          >
            <Text className="text-lg font-bold text-white">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Content>
  );
};

export default Register;
