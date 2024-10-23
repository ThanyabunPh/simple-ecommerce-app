import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import useCartStore from "@/store/useItemCartStore ";
import { Ionicons } from "@expo/vector-icons";
import CartList from "@/components/CartList.tsx/CartList";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useAuthStore from "@/store/useAuthStore";

const ShopingCart = () => {
  const cartItem = useCartStore((state) => state.Carts);
  const TotalPrice = useCartStore((state) => state.total);
  const fetchItem = useCartStore((state) => state.fetchItem);

  const { session } = useAuthStore();

  useEffect(() => {
    fetchItem(session);
  }, [session]);

  const router = useRouter();

  return (
    <View className="flex-1">
      <View className="flex-row items-center shadow-lx shadow-black mt-5 p-5 border-b-2 border-amber-500">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={30} color="orange" />
        </TouchableOpacity>
        <Text className="font-semibold ml-5 text-xl">
          รถเข็น ({cartItem.length})
        </Text>
      </View>
      <View className="flex-1 justify-between">
        <View className="mx-2 rounded-md flex-1">
          {cartItem.length > 0 ? (
            <CartList cartItems={cartItem} />
          ) : (
            <View className="flex-1 justify-center items-center">
              <FontAwesome6 name="cart-plus" size={100} color="orange" />
              <Text className="text-xl mt-5">
                You don't have any product in your cart !
              </Text>
            </View>
          )}
        </View>
        {cartItem.length > 0 && (
          <View className="shadow-md shadow-black bg-white pt-5 rounded-t-xl">
            <View className="px-10 flex-row justify-between">
              <Text className="font-semibold text-xl">Total: </Text>
              <Text className="font-semibold text-xl">{TotalPrice} $</Text>
            </View>
            <TouchableOpacity className="m-3 px-10 py-2 rounded-xl bg-amber-500">
              <Text className="font-bold text-xl text-white text-center">
                Checkout !
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ShopingCart;
