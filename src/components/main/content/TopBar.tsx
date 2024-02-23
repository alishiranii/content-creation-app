"use client";
import { useProject } from "@/store/useStore";
import React from "react";

function TopBar() {
  const project = useProject((state: any) => state.project);
  return (
    project && (
      <div>
        <div className="p-3 flex flex-col gap-4">
          <h1 className="text-white text-3xl">{project.title}</h1>
          <p className="text-gray-400">{project.description}</p>
        </div>
      </div>
    )
  );
}

export default TopBar;
