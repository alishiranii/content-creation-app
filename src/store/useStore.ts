import { create } from "zustand";
import { SidebarState,ProjectState,TabState } from "@/types/store";

export const useSidebar = create<SidebarState>((set) => ({
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
}));

export const useProject = create<ProjectState>((set) => ({
  project: undefined,
  setProject: (p) => set(() => ({ project: p })),
}));

export const useTab = create<TabState>((set) => ({
  tab: "chat",
  setTab: (t) => set(() => ({ tab: t })),
}));
