import { create } from "zustand";

export const useSidebar=create((set)=>({
    isOpen:false,
    setOpen: () => set((state:any) => ({ isOpen: !state.isOpen }))
}))