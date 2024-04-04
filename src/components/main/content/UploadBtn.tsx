"use client";
import { clientSupabase } from "@/lib";
import React, { Dispatch, FormEvent, SetStateAction } from "react";

function UploadBtn({ setAvatar }: {setAvatar:Dispatch<SetStateAction<string | undefined>>}) {
  async function handleChange(e: FormEvent<HTMLInputElement>) {
    const files = (e.target as HTMLInputElement).files;
    const reader = new FileReader();
    if (!files) return;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") setAvatar(event.target?.result);
    };
  }

  return (
    <input
      type="file"
      className="file-input file-input-bordered w-full max-w-xs"
      onChange={handleChange}
    />
  );
}

export default UploadBtn;
