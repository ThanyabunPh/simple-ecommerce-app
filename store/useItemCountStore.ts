import { create } from "zustand";

interface ItemsCount {
  count: number;
  increase: () => void;
  decrease: () => void;
  clearCount: () => void;
}

const useItemsCountStore = create<ItemsCount>((set) => ({
  count: 1,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  clearCount: () => set({ count: 1 }),
}));

export default useItemsCountStore;
