import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface ProductListProps {
  products: {
    id: string;
    price: number;
    name: string;
    image: string;
  }[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <ScrollView>
      <View className="flex-row flex-wrap">
        {products.map((product) => (
          <TouchableOpacity key={product.id} className="w-1/2 p-1">
            <View className="bg-white shadow-black">
              <View className="flex-1">
                <Image
                  source={{ uri: product.image }}
                  className="w-full h-32"
                  resizeMode="cover"
                />
              </View>
              <View className="p-2 flex-1 justify-between">
                <View className="flex-1 justify-between">
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    className="min-h-[40px]"
                  >
                    {product.name}
                  </Text>
                </View>
                <View className="p-1 items-center flex-row justify-between">
                  <Text className="text-amber-500 mt-2">$ {product.price}</Text>
                  <FontAwesome name="heart" size={20} color={"orange"} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProductList;
