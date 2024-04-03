"use client";
import download from 'downloadjs';
import React from 'react'
import { MdOutlineCloudDownload } from 'react-icons/md';

function DownloadBtn({image}:{image:string}) {
    function handleDownload(image: string) {
      if (image) download(image);
    }
  return (
    <a
      className="absolute top-4 right-4 btn-ghost hidden group-hover:btn group-hover:btn-circle"
      onClick={() => handleDownload(image)}>
      <MdOutlineCloudDownload size={30} />
    </a>
  );
}

export default DownloadBtn