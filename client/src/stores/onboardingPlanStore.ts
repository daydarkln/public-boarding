import { create } from "zustand";
import { Edge, Node } from "reactflow";

type Props = {
  nodes: Node[];
  edges: Edge[];
  onboardingPlan: null;
  setOnboardingPlan: (data: null) => void;
  setData: (data: { nodes: Node[]; edges: Edge[] }) => void;
};

export const useOnboardingPlanStore = create<Props>((set) => {
  return {
    nodes: [],
    edges: [],
    onboardingPlan: null,
    setData: (data) => {
      const { nodes, edges } = data;
      set({ nodes, edges });
    },
    setOnboardingPlan: (onboardingPlan) => set({ onboardingPlan }),
  };
});
