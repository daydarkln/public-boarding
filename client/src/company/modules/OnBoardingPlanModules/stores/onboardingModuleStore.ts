import { create } from "zustand";

type Props = {
  onboardingModule: null;
  setOnboardingModule: (onboardingModule: null) => void;
};

export const useOnboardingModuleStore = create<Props>((set) => ({
  onboardingModule: null,
  setOnboardingModule: (onboardingModule) => set({ onboardingModule }),
}));
