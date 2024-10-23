import { create } from "zustand";
import { database } from "../firebaseConfig";
import { ref, set as databaseSet, get } from "firebase/database";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

interface CartState {
  isLoading: boolean;
  Carts: CartItem[];
  total: number;
  addItem: (item: CartItem, session: string | null) => void;
  removeItem: (id: string, session: string | null) => void;
  fetchItem: (session: string | null) => void;
}

const useCartStore = create<CartState>((set) => ({
  isLoading: false,
  Carts: [],
  total: 0,
  addItem: async (item, session) => {
    set({ isLoading: true });
    set((state) => {
      const existingItem = state.Carts.find((i) => i.id === item.id);
      let newCarts;
      let newTotal;

      if (existingItem) {
        newCarts = state.Carts.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
        newTotal = state.total + item.price * item.quantity;
      } else {
        newCarts = [...state.Carts, item];
        newTotal = state.total + item.price * item.quantity;
      }

      const itemRef = ref(database, `cart/${session}/Carts`);
      databaseSet(itemRef, newCarts);

      return {
        Carts: newCarts,
        total: newTotal,
      };
    });
    set({ isLoading: false }); // Reset loading to false
  },

  removeItem: async (id, session) => {
    set({ isLoading: true }); // Set loading to true
    set((state) => {
      const itemToRemove = state.Carts.find((item) => item.id === id);
      if (!itemToRemove) return state;

      const newCarts = state.Carts.filter((item) => item.id !== id);

      const itemRef = ref(database, `cart/${session}/Carts`);
      databaseSet(itemRef, newCarts);

      return {
        Carts: newCarts,
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };
    });
    set({ isLoading: false }); // Reset loading to false
  },

  clearCart: () => set({ Carts: [], total: 0 }),
  fetchItem: async (session) => {
    set({ isLoading: true });
    try {
      const dbRef = ref(database, `cart/${session}/Carts`);
      const snapshot = await get(dbRef);
      const data = snapshot.val();
      const items = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      set({ Carts: items, isLoading: false, total: total });
    } catch (error) {
      throw error;
    }
  },
}));

export default useCartStore;
