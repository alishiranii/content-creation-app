"use client"
import { useTab } from '@/store/useStore';
import React from 'react';
import download from "downloadjs";
import { MdOutlineCloudDownload } from 'react-icons/md';
import DownloadBtn from './DownloadBtn';
import Image from 'next/image';
import { MockupsProps } from '@/types/components';
import EditBtn from './EditBtn';

function Instagram({image,description,username,avatar,isSubmiting}:MockupsProps) {
  const tab = useTab((state) => state.tab);
  return (
    <div className="bg-white border-gray-300 w-96 border">
      <header className="grid grid-cols-6 items-center p-3 border-b border-b-gray-300">
        <div className="">
          <img
            src={avatar ? avatar : "https://via.placeholder.com/50x50"}
            width={50}
            height={50}
            className="rounded-full w-10 h-10"
            alt="image"
          />
        </div>

        <div className="col-span-4 text-sm font-semibold">
          {username ? username : "user name"}
        </div>

        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
      </header>

      <div className={`relative group ${isSubmiting && "animate-pulse"}`}>
        <DownloadBtn image={image} />
        <EditBtn image={image} />
        <img
          width={1080}
          height={1345}
          src={image ? image : "https://via.placeholder.com/1080x1345"}
          alt="image"
        />
      </div>

      <div className="flex flex-col p-4 gap-3">
        <div className="flex flex-row gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>

        <div className="text-sm font-semibold">11,552 Likes</div>

        <div className="text-sm">
          {description ? description : "fill out the description input."}
        </div>

        <div className="text-gray-500 text-sm">View all 877 comments</div>

        <div className="text-gray-400 text-xs">2 HOURS AGO</div>
      </div>

      <footer></footer>
    </div>
  );
}

export default Instagram
