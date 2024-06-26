"use client"
import { useSidebar } from '@/store/useStore'
import React from 'react'
import { RiMenu3Fill } from "react-icons/ri";


function SidebarBtn() {
    const setOpen=useSidebar((state)=>state.setOpen);
  return (
    <button
      onClick={setOpen}
      aria-label='sidebar button'
      className="btn btn-ghost text-3xl text-white ml-auto btn-circle">
      <RiMenu3Fill />
    </button>
  );
}

export default SidebarBtn