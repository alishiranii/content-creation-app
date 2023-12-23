"use client"
import { useSidebar } from '@/store/useStore'
import React from 'react'

function SidebarBtn() {
    const setOpen=useSidebar((state:any)=>state.setOpen);
  return (
    <button onClick={setOpen} className='btn btn-neutral btn-circle fixed left-5 top-5'>open</button>
  )
}

export default SidebarBtn