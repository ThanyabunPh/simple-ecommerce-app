import { create } from "zustand";
import { database } from "../firebaseConfig";
import { ref, get } from "firebase/database";

type ItemsStore = {
  items: any[];
  loading: boolean;
  error: null;
  fetchData: () => void;
};

const useItemsStore = create<ItemsStore>()((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true });
    try {
      const dbRef = ref(database, "items");
      const snapshot = await get(dbRef);
      const data = snapshot.val();
      const items = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      set({ items, loading: false });
    } catch (error) {
      //@ts-expect-error
      set({ error: error.message, loading: false });
    }
  },
}));

export default useItemsStore;
