"use client";
import { useSidebar } from "@/store/useStore";
import React, { useEffect, useState } from "react";
import { CiSearch, CiCreditCard1, CiCirclePlus } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import ListItem from "./ListItem";
import SearchMenu from "./SearchMenu";
import { clientSupabase } from "@/lib";

function Sidebar({ user }: { user: string | undefined }) {
  const open = useSidebar((state: any) => state.open);
  const setOpen = useSidebar((state: any) => state.setOpen);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [list, setList] = useState<any[] | null>();

  const supabase = clientSupabase;
  async function fetchList() {
    console.log("list is fetching");
    
    const { data, error } = await supabase.from("social").select();
    setList(data);
  }

  useEffect(() => {
    fetchList()
    const subscription = supabase
      .channel("social")
      .on(
        "postgres_changes",
        {
          event: "INSERT", // Listen only to UPDATEs
          schema: "public",
        },
        (payload) => fetchList()
      )
      .subscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    if (open) setOpen();
    router.refresh();
  }

  function handleClick() {
    (
      document.getElementById("project_modal") as HTMLDialogElement
    )?.showModal();
  }
  list?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return (
    <div
      className={`lg:w-1/4  ${
        open
          ? "w-3/4 md:w-2/4 fixed lg:static m-0 bottom-0 top-0 h-full "
          : "hidden"
      } lg:block w-full lg:m-3 shadow-lg z-10 bg-[#0D0F10] rounded-lg lg:h-[95vh]`}>
      <SearchMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="p-3 flex flex-col h-full">
        <div className="flex relative flex-col gap-3">
          <h3 className="uppercase text-[#686B6E] text-sm">General</h3>
          {open && (
            <button
              onClick={setOpen}
              className="btn btn-circle text-4xl lg:hidden text-white btn-ghost absolute -top-3 -right-1">
              <IoCloseCircleOutline />
            </button>
          )}
          <div className="flex flex-col">
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-ghost justify-between">
              <div className="flex items-center gap-2">
                <CiSearch color="#686B6E" size={23} />{" "}
                <span className="text-white">Search</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="kbd">ctrl</kbd>
                <span className="text-white">+</span>
                <kbd className="kbd">k</kbd>
              </div>
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
          <div className="flex gap-2 flex-col ">
            <button
              onClick={handleClick}
              className="btn btn-ghost justify-start">
              <CiCirclePlus color="#686B6E" size={23} />{" "}
              <span className="text-[#686B6E]">Add new project</span>
            </button>{" "}
            <div className="flex flex-col gap-2 max-h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent">
              {list ? (
                list.map((l) => (
                  <ListItem
                    key={l.id}
                    id={l.id}
                    description={l.project_description}
                    title={l.project_name}
                    social={l.project_type}
                  />
                ))
              ) : (
                <div className="loading loading-dots w-14 text-green-700 mx-auto"></div>
              )}
            </div>
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
            <div className="flex flex-col gap-2 overflow-hidden">
              <h3 className="text-white text-sm">{user}</h3>
              <p className="text-green-600 text-xs">Premium</p>
            </div>
            <button
              onClick={handleSignOut}
              className="ml-auto btn btn-circle btn-ghost text-[#686B6E] text-3xl">
              <MdOutlineLogout />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
