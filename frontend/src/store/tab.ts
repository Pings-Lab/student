import { create } from "zustand";

interface TabState {
  tab: number;


  setTab: (v: number) => void;
}
const useTabState = create<TabState>((set) => ({
  tab: 0,

  setTab: (v) => set({ tab: v }),



}));

export default useTabState;