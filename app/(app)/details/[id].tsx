import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import useItemsStore from "@/store/useItemsStore";
import useItemsCountStore from "@/store/useItemCountStore";
import useCartStore from "@/store/useItemCartStore";
import { useEffect } from "react";

import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import useAuthStore from "@/store/useAuthStore";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const fetchOneData = useItemsStore((state) => state.fetchOneData);
  const items = useItemsStore((state) => state.items);
  const loading = useItemsStore((state) => state.loading);
  const error = useItemsStore((state) => state.error);

  const count = useItemsCountStore((state) => state.count);
  const increase = useItemsCountStore((state) => state.increase);
  const decrease = useItemsCountStore((state) => state.decrease);
  const clearCount = useItemsCountStore((state) => state.clearCount);

  const { addItem } = useCartStore();

  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    clearCount();
    if (id) {
      fetchOneData(id as string);
    }
  }, [id, fetchOneData]);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={50} />
      </View>
    );
  if (error)
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">
          Something when wrong, please try again.
        </Text>
      </View>
    );

  const handleCartItems = () => {
    addItem(
      {
        id: id as string,
        name: items[0].name,
        price: items[0].price,
        quantity: count,
        image: items[0].image,
      },
      session
    );

    router.navigate("/(app)/shopping-cart");
  };

  return (
    <View className="flex-1" key={items[0].image}>
      <Image
        source={{ uri: items[0].image }}
        className="w-full h-72"
        resizeMode="cover"
      />
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={30} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            router.push("/(app)/shopping-cart");
          }}
        >
          <FontAwesome name="shopping-cart" size={30} color={"#f59e0b"} />
        </TouchableOpacity>
      </View>
      <View className="mt-5 px-5 justify-between flex-1">
        <View>
          <Text className="font-bold text-3xl text-amber-500">
            {items[0].price} $
          </Text>
          <Text className="font-semibold mt-2">{items[0].name}</Text>
        </View>
        <View className="flex-row w-full justify-around items-center">
          <TouchableOpacity onPress={decrease}>
            <AntDesign name="minuscircle" size={40} color="#dc3545" />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold">{count}</Text>
          <TouchableOpacity onPress={increase}>
            <AntDesign name="pluscircle" size={40} color="#28a745" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="items-center justify-center p-5 bg-amber-500 rounded-md w-full mb-10"
          onPress={() => {
            handleCartItems();
          }}
        >
          <Text className="font-bold text-lg">Put in my cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 50,
    padding: 10,
  },
});
