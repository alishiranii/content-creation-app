import { create } from "zustand";

export const useSidebar=create((set)=>({
    open:false,
    setOpen: () => set((state:any) => ({ open: !state.open }))
}))