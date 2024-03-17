"use client";
import { clientSupabase } from "@/lib";
import React from "react";

function UploadBtn() {
  const supabase = clientSupabase;
  async function handleChange(e) {
      const avatarFile = e.target.files[0];
      const { data: { identities } } = await supabase.auth.getUserIdentities();
      console.log(identities);
      
    const { data, error } = await supabase.storage
      .from("images")
      .upload("7353b679-7eb0-4395-b93a-25b7da0a6417", avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
      console.log(data);
      console.log(error);
      
      
  }

  return <input type="file" onChange={handleChange} />;
}

export default UploadBtn;
