"use client"
import React from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";

function Modal({children}:{children:React.ReactNode}) {
  return (
    <dialog id="project_modal" className="modal">
  <div className="modal-box bg-[#0D0F10]"> 
    <div className="flex justify-end">
      <form method="dialog">
        <button className="btn btn-circle btn-ghost text-white"><IoIosCloseCircleOutline size={35}/></button>
      </form>
    </div>
    {children}
  </div>
</dialog>
  )
}

export default Modal