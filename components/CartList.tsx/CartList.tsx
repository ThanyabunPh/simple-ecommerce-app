import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import useCartStore from "@/store/useItemCartStore "; // Adjust the import path
import useAuthStore from "@/store/useAuthStore";

interface item {
  id: string;
  price: number;
  name: string;
  image: string;
  quantity: number;
}

interface CartListProps {
  cartItems: item[];
}

const CartList = ({ cartItems }: CartListProps) => {
  const { session } = useAuthStore();
  const { addItem, removeItem, Carts, total } = useCartStore();

  const handleIncrement = (item: item) => {
    addItem({ ...item, quantity: 1 }, session);
  };

  const handleDecrement = (item: item) => {
    if (item.quantity > 1) {
      addItem({ ...item, quantity: -1 }, session);
    } else {
      removeItem(item.id, session);
    }
  };

  return (
    <View>
      {cartItems.map((item) => (
        <View
          key={item.id}
          className="mt-5 p-3 rounded-md shadow-md shadow-black bg-white flex-row"
        >
          <Image
            source={{ uri: item.image }}
            className="h-32 w-32 rounded-md"
            resizeMode="cover"
          />
          <View className="ml-3 justify-between flex-1">
            <Text className="font-semibold mt-2">{item.name}</Text>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-2xl mt-2 text-amber-500">
                $ {item.price * item.quantity}
              </Text>
              <View className="flex-row justify-center items-center">
                <TouchableOpacity onPress={() => handleDecrement(item)}>
                  <AntDesign name="minussquareo" size={27} color="gray" />
                </TouchableOpacity>
                <View className="px-2 border-2 border-gray-">
                  <Text>{item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => handleIncrement(item)}>
                  <AntDesign name="plussquareo" size={27} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CartList;
