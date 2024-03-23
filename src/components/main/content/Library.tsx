"use client"
import { clientSupabase } from "@/lib";
import React, { useEffect } from "react";

function Library() {
  const supabase = clientSupabase;

  async function getAllImages() {
    const { data, error } = await supabase.storage
      .from("images")
      .list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
      console.log(data);
      
  }

    useEffect(() => {
      getAllImages()
  }, []);

  return <div>Library</div>;
}

export default Library;
