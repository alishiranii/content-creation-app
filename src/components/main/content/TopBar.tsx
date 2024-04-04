"use client";
import { useProject, useTab } from "@/store/useStore";
import React, { useState } from "react";
import SidebarBtn from "../sidebar/SidebarBtn";
import { IoChatboxEllipsesOutline, IoCreateOutline } from "react-icons/io5";
import { MdOutlinePhotoLibrary } from "react-icons/md";

function TopBar() {
  const project = useProject((state) => state.project);
  const setTab = useTab((state) => state.setTab);

  function handleClick(t: string, e: React.MouseEvent) {
    document.querySelector(".activeTab")?.classList.remove("activeTab");
    e.currentTarget?.classList.add("activeTab");
    setTab(t);
  }
  return (
    <div className="flex flex-col top-0 w-full bg-[#0D0F10] lg:rounded-lg lg:mt-3 p-5">
      <div className="flex justify-between items-center">
        {project && (
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-3xl">{project.title}</h1>
            <p className="text-gray-400">{project.description}</p>
          </div>
        )}
        <SidebarBtn />
      </div>
      {project && (
        <>
          <div className="divider divider-neutral w-full"></div>
          <div role="tablist" className="tabs tabs-bordered lg:w-1/2">
            <a
              role="tab"
              onClick={(e) => handleClick("chat", e)}
              className="tab activeTab text-white text-lg flex flex-row-reverse items-center gap-2">
              Chat
              <IoChatboxEllipsesOutline />
            </a>
            <a
              role="tab"
              onClick={(e) => handleClick("create", e)}
              className="tab text-white text-lg flex flex-row-reverse items-center gap-2">
              Create
              <IoCreateOutline />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default TopBar;
