"use client";
import { clientSupabase } from "@/lib";
import React, { FormEvent } from "react";

function UploadBtn() {
  const supabase = clientSupabase;
  async function handleChange(e:FormEvent<HTMLInputElement>) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const avatarFile = files[0];
      
    const { data, error } = await supabase.storage
      .from("images")
      .upload(avatarFile.name, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
    } else {
      console.error('No file selected');
    }
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
