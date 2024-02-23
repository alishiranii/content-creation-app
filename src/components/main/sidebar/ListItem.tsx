"use client"
import Image from 'next/image'
import React, { useEffect } from 'react';
import Instagram from "@/assets/logos/instagram.svg"
import Youtube from "@/assets/logos/youtube.svg"
import X from "@/assets/logos/x.svg"

interface ListItemProps{
  title: string,
  social:string
}

function ListItem({title,social}:ListItemProps) {
  
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    document.querySelector(".listItem")?.classList.remove("listItem");
    e.currentTarget.classList.add("listItem");
  }

  return (
    <div onClick={handleClick} className="btn btn-ghost justify-start text-white">
      {social == "Instagram" && (
        <Image src={Instagram} width={30} alt="logo" className="drop" />
      )}
      {social == "Youtube" && (
        <Image src={Youtube} width={30} alt="logo" className="drop" />
      )}
      {social == "X" && (
        <Image src={X} width={30} alt="logo" className="drop" />
      )}
      <p className="font-medium">{title}</p>
    </div>
  );
}

export default ListItem