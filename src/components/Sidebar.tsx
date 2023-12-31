"use client";
import { useSidebar } from "@/store/useStore";
import React from "react";
import { CiSearch, CiCreditCard1, CiCirclePlus } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import ListItem from "./ListItem";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function Sidebar({ user }: { user: string | undefined }) {
  const isOpen = useSidebar((state: any) => state.isOpen);
  const setOpen = useSidebar((state: any) => state.setOpen);
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    if (isOpen) setOpen();
    router.refresh();
  }

  function handleClick() {
    (
      document.getElementById("project_modal") as HTMLDialogElement
    )?.showModal();
  }

  return (
    <div
      className={`lg:w-1/4 ${
        isOpen
          ? "w-3/4 md:w-2/4 fixed lg:static m-0 bottom-0 top-0 h-full "
          : "hidden"
      } lg:block w-full lg:m-3 shadow-lg z-50 bg-[#0D0F10] rounded-lg lg:h-[95vh]`}
    >
      <div className="p-3 flex flex-col h-full">
        <div className="flex relative flex-col gap-3">
          <h3 className="uppercase text-[#686B6E] text-sm">General</h3>
          {isOpen && (
            <button
              onClick={setOpen}
              className="btn btn-circle text-4xl lg:hidden text-white btn-ghost absolute top-0 right-0"
            >
              <IoCloseCircleOutline />
            </button>
          )}
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
          <div className="flex gap-2 flex-col">
            <button
              onClick={handleClick}
              className="btn btn-ghost justify-start"
            >
              <CiCirclePlus color="#686B6E" size={23} />{" "}
              <span className="text-[#686B6E]">Add new project</span>
            </button>{" "}
            <ListItem/>
            <Modal />
          </div>
        </div>
        <div className="mt-auto glass w-full rounded-2xl flex items-center">
          <div className="p-2 w-full flex gap-2 items-center">
            <div className="avatar placeholder online">
              <div className="w-16 bg-neutral mask mask-squircle">
                <span className="text-white text-2xl uppercase">
                  {user?.[0]}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white text-sm">{user}</h3>
              <p className="text-green-600 text-xs">Premium</p>
            </div>
            <button
              onClick={handleSignOut}
              className="ml-auto btn btn-circle btn-ghost text-[#686B6E] text-3xl"
            >
              <MdOutlineLogout />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
