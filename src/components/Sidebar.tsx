"use client";
import { useSidebar } from "@/store/useStore";
import React from "react";
import { CiSearch, CiCreditCard1, CiCirclePlus } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Input from "./Input";
import { BiRename } from "react-icons/bi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import X from "@/assets/logos/x.svg";
import Instagram from "@/assets/logos/instagram.svg";
import Youtube from "@/assets/logos/youtube.svg";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ModalSchema = z.object({
  project: z
    .string()
    .min(6, { message: "Project name must be at least 6 characters" }),
});

function Sidebar({ user }: { user: string | undefined }) {
  const isOpen = useSidebar((state: any) => state.isOpen);
  const setOpen = useSidebar((state: any) => state.setOpen);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(ModalSchema) });

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

  const onSubmit: SubmitHandler<FieldValues> = async (d) => {
    
    (
      document.getElementById("project_modal") as HTMLDialogElement
    )?.close();
    
  };

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
          <div className="flex flex-col">
            <button
              onClick={handleClick}
              className="btn btn-ghost justify-start"
            >
              <CiCirclePlus color="#686B6E" size={23} />{" "}
              <span className="text-[#686B6E]">Add new project</span>
            </button>{" "}
            <Modal>
              <form onSubmit={handleSubmit(onSubmit)} className="pt-7 flex flex-col gap-10">
                <div>
                  <label className="label text-white">
                   1. Enter Name of Your Project
                  </label>
                  <Input
                    error={errors.project?.message}
                    name="project"
                    register={register}
                    inpType={"text"}
                    Icon={<BiRename />}
                    placeHolder={"Enter Name..."}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="label text-white">
                    2. Choose a social media
                  </h3>
                  <div className="flex items-center justify-around">
                    <div className="btn glass btn-ghost w-24 h-24">
                      <Image src={Instagram} alt="logo" />
                    </div>
                    <div className="btn glass btn-ghost w-24 h-24">
                      <Image src={Youtube} alt="logo" />
                    </div>
                    <div className="btn glass btn-ghost w-24 h-24">
                      <Image src={X} alt="logo" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn bg-[#B6F09C]" >Submit</button>
              </form>
            </Modal>
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
