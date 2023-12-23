'use client'
import { useSidebar } from "@/store/useStore";
import React from "react";
import { CiSearch, CiCreditCard1, CiCirclePlus } from "react-icons/ci";
import {MdOutlineLogout} from "react-icons/md";



function Sidebar({user}:{user:string|undefined}) {
  const isOpen=useSidebar((state:any)=>state.isOpen);
  return (
    <div className={`lg:w-1/4 ${isOpen ? "w-3/4 fixed m-0 bottom-0 top-0 h-full" : "hidden"} lg:block w-full m-3 shadow-lg z-50 bg-[#0D0F10] rounded-lg h-[95vh]`}>
      <div className="p-3 flex flex-col h-full">
        <div className="flex flex-col gap-3">
          <h3 className="uppercase text-[#686B6E] text-sm">General</h3>
          <div className="flex flex-col">
            <button className="btn btn-ghost justify-start">
              <CiSearch color="#686B6E" size={23} />{" "}
              <span className="text-white">Search</span>
            </button>
            <button className="btn btn-ghost justify-start">
              <CiCreditCard1 color="#686B6E" size={23} />{" "}
              <span className="text-white">Billing</span>
            </button>
          </div>
        </div>
        <div className="divider divider-neutral"></div>
        <div className="flex flex-col gap-3">
          <h3 className="uppercase text-[#686B6E] text-sm">Projects</h3>
          <div className="flex flex-col">
            <button className="btn btn-ghost justify-start">
              <CiCirclePlus color="#686B6E" size={23} />{" "}
              <span className="text-[#686B6E]">Add new project</span>
            </button>{" "}
          </div>
        </div>
        <div className="mt-auto glass w-full rounded-2xl flex items-center">
          <div className="p-2 w-full flex gap-2 items-center">
            <div className="avatar placeholder online">
              <div className="w-16 bg-neutral mask mask-squircle">
                <span className="text-white text-2xl uppercase">{user?.[0]}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white text-sm">{user}</h3>  
              <p className="text-green-600 text-xs">Premium</p>
            </div>
            <button className="ml-auto btn btn-circle btn-ghost text-[#686B6E] text-3xl">
              <MdOutlineLogout />  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
