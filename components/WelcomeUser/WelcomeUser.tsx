import { View, Image, Text } from "react-native";
import User from "@/assets/images/user.png";

const WelcomeUser = ({ user }: { user: string | null }) => {
  return (
    <View className="flex-row justify-center items-center">
      <View className="border-2 border-gray-300 rounded-full justify-center items-center">
        <Image source={User} style={{ width: 60, height: 60 }} />
      </View>
      <View className="pl-3">
        <Text className="text-lg">Welcome Back</Text>
        <Text className="text-lg font-bold text-amber-500">
          {user ? user : "user"}
        </Text>
      </View>
    </View>
  );
};

export default WelcomeUser;
