"use client";
import { clientSupabase } from "@/lib";
import React, { FormEvent } from "react";

function UploadBtn({setAvatar}:any) {
  const supabase = clientSupabase;
  async function handleChange(e:FormEvent<HTMLInputElement>) {
    const files = (e.target as HTMLInputElement).files;
    const reader = new FileReader();
    if (!files) return;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      setAvatar(event.target?.result);
       // Set the image source as data URL // Append the image to the body
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
