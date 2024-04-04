"use client"
import Image from 'next/image'
import React, { useEffect } from 'react';
import Instagram from "@/assets/logos/instagram.svg"
import Youtube from "@/assets/logos/youtube.svg"
import X from "@/assets/logos/x.svg"
import { useProject, useSidebar } from '@/store/useStore';
import { usePathname, useRouter } from "next/navigation";
import { ListItemProps } from '@/types/components';

function ListItem({ title, social, description,id }: ListItemProps) {
  const setOpen = useSidebar((state: any) => state.setOpen);
  const setProject = useProject((state: any) => state.setProject);
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    document.querySelector(".listItem")?.classList.remove("listItem");
    e.currentTarget.classList.add("listItem");
    router.push(pathname + "?" + "projectid" + "=" + id)
    setProject({title,description,social})
    setOpen();
  }

  return (
    <div
      onClick={handleClick}
      className="btn btn-ghost justify-start text-white">
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