import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useItemsStore from "@/store/useItemsStore";
import React, { useEffect } from "react";
import { router, Href } from "expo-router";

import Content from "@/components/Content/Content";
import ProductList from "@/components/ProductList/ProductList";
import WelcomeUser from "@/components/WelcomeUser/WelcomeUser";

const AppIndex = () => {
  const items = useItemsStore((state) => state.items);
  const loading = useItemsStore((state) => state.loading);
  const error = useItemsStore((state) => state.error);
  const fetchData = useItemsStore((state) => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onCartPress = () => {
    router.push("/shopping-cart" as Href);
  };

  return (
    <Content>
      <View className="flex-row">
        <View className="flex-1 flex-row justify-between">
          <WelcomeUser />
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
      ) : (
        <ProductList products={items} />
      )}
    </Content>
  );
};

export default AppIndex;
