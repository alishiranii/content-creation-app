import { create } from "zustand";

export const useSidebar=create((set)=>({
    open:false,
    setOpen: () => set((state:any) => ({ open: !state.open }))
}))

export const useProject = create((set) => ({
    project: undefined,
    setProject: (p:any) => set(()=>({project:p}))
}))