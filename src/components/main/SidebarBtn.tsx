"use client"
import { useSidebar } from '@/store/useStore'
import React from 'react'
import { RiMenu2Fill } from "react-icons/ri";


function SidebarBtn() {
    const setOpen=useSidebar((state:any)=>state.setOpen);
  return (
    <button onClick={setOpen} className='btn btn-ghost text-3xl text-white btn-circle fixed left-5 top-5'><RiMenu2Fill /></button>
  )
}

export default SidebarBtn