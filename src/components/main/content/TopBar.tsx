"use client";
import { useProject } from "@/store/useStore";
import React from "react";
import SidebarBtn from "../sidebar/SidebarBtn";
import { IoChatboxEllipsesOutline, IoCreateOutline } from "react-icons/io5";

function TopBar() {
  const project = useProject((state: any) => state.project);
  return (
    project && (
      <div className="flex flex-col absolute top-0 w-full bg-[#0D0F10] lg:rounded-lg lg:mt-3 p-5 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-3xl">{project.title}</h1>
            <p className="text-gray-400">{project.description}</p>
          </div>
          <SidebarBtn />
        </div>

        <div className="divider divider-neutral w-full"></div>
        <div role="tablist" className="tabs tabs-bordered lg:w-1/2">
          <a
            role="tab"
            className="tab text-white text-lg flex items-center gap-2">
            Chat With AI
            <IoChatboxEllipsesOutline />
          </a>
          <a
            role="tab"
            className="tab text-white text-lg tab-active flex items-center gap-2 !border-purple-500">
            Create Your Post
            <IoCreateOutline />
          </a>
        </div>
      </div>
    )
  );
}

export default TopBar;
