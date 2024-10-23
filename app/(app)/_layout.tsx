import useAuthStore from "@/store/useAuthStore";
import { Stack, Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function AppLayout() {
  const { isLoading, session } = useAuthStore();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={50} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="shopping-cart"
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="details/[id]"
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}
