import { create } from "zustand";

type UseAppStoreProps = {
  isDarkTheme: boolean;
  setTheme: (theme: boolean) => void;
};
export const useAppStore = create<UseAppStoreProps>((set) => ({
  isDarkTheme: false,
  setTheme: (theme) => set({ isDarkTheme: theme }),
}));
