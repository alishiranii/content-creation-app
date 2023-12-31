"use client";
import Image from "next/image";
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import X from "@/assets/logos/x.svg";
import Instagram from "@/assets/logos/instagram.svg";
import Youtube from "@/assets/logos/youtube.svg";
import Input from "./Input";
import { BiRename } from "react-icons/bi";
import { z } from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ModalSchema = z.object({
  project: z
    .string()
    .min(6, { message: "Project name must be at least 6 characters" }),
});

function Modal() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(ModalSchema) });

  function handleClick(e: {
    currentTarget: { classList: { add: (arg0: string) => void } };
  }) {
    document.querySelector(".selected")?.classList.remove("selected");
    e.currentTarget.classList.add("selected");
  }
  const onSubmit: SubmitHandler<FieldValues> = async (d) => {
    (document.getElementById("project_modal") as HTMLDialogElement)?.close();
  };

  
  return (
    <dialog id="project_modal" className="modal">
      <div className="modal-box bg-[#0D0F10]">
        <div className="flex justify-end">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost text-white">
              <IoIosCloseCircleOutline size={35} />
            </button>
          </form>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pt-7 flex flex-col gap-10"
        >
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
            <h3 className="label text-white">2. Choose a social media</h3>
            <div className="flex items-center justify-around">
              <div
                onClick={handleClick}
                className="btn glass btn-ghost w-24 h-24"
              >
                <Image src={Instagram} alt="logo" />
              </div>
              <div
                onClick={handleClick}
                className="btn glass btn-ghost w-24 h-24"
              >
                <Image src={Youtube} alt="logo" />
              </div>
              <div
                onClick={handleClick}
                className="btn glass btn-ghost w-24 h-24"
              >
                <Image src={X} alt="logo" />
              </div>
            </div>
          </div>
          <button type="submit" className="btn bg-[#B6F09C]">
            Submit
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default Modal;
