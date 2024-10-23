import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useItemsStore from "@/store/useItemsStore";
import React from "react";
import { router } from "expo-router";
import { useFocusEffect } from "expo-router";

import Content from "@/components/Content/Content";
import ProductList from "@/components/ProductList/ProductList";
import WelcomeUser from "@/components/WelcomeUser/WelcomeUser";
import useAuthStore from "@/store/useAuthStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const AppIndex = () => {
  const items = useItemsStore((state) => state.items);
  const loading = useItemsStore((state) => state.loading);
  const error = useItemsStore((state) => state.error);
  const fetchData = useItemsStore((state) => state.fetchData);
  const { logout } = useAuthStore();
  const user = useAuthStore((state) => state.user);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const onCartPress = () => {
    router.push("/shopping-cart");
  };

  const onLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <Content>
      <View className="flex-row">
        <View className="flex-1 flex-row justify-between">
          <WelcomeUser user={user} />
          <View className="flex-row">
            <TouchableOpacity
              className="p-4 justify-center items-center"
              onPress={() => {
                onLogout();
              }}
            >
              <MaterialIcons name="logout" size={24} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-4 justify-center items-center"
              onPress={() => {
                onCartPress();
              }}
            >
              <FontAwesome name="shopping-cart" size={30} color={"#f59e0b"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-row mt-5">
        <View className="border-2 border-gray-300 flex-1 p-3 rounded-xl">
          <FontAwesome name="search" size={15} />
        </View>
      </View>
      <Text className="text-xl mt-5 font-bold" style={{ fontFamily: "Prompt" }}>
        Best selling
      </Text>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={50} />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text>Something went wrong !</Text>
          <Text>Please try again.</Text>
        </View>
      ) : (
        <ProductList products={items} />
      )}
    </Content>
  );
};

export default AppIndex;
