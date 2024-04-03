import React from 'react'
import DownloadBtn from './DownloadBtn';

function Youtube({ image, description, username, avatar, isSubmiting }: any) {
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white p-4 rounded-lg">
      <div className="w-full flex flex-col">
        <div className="relative">
          <div className={`relative group ${isSubmiting && "animate-pulse"}`}>
            <DownloadBtn image={image} />
            <img src={image ? image : "https://via.placeholder.com/1280x720"} />
          </div>

          <p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">
            1:15
          </p>
        </div>

        <div className="flex flex-row mt-2 gap-2">
          <a href="#">
            <img
              src={avatar ? avatar : "https://via.placeholder.com/50x50"}
              className="rounded-full w-10 h-10"
            />
          </a>

          <div className="flex flex-col">
            <a href="#">
              <p className="text-black text-sm font-semibold">
                {description ? description : "fill out the description input."}
              </p>
            </a>
            <a
              className="text-gray-500 text-xs mt-2 hover:text-gray-300"
              href="#">
              {" "}
              {username ? username : "user name"}
            </a>
            <p className="text-gray-500 text-xs mt-1">
              241K views . 3 years ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Youtube