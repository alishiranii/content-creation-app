"use client"
import { clientSupabase } from "@/lib";
import { useTab } from "@/store/useStore";
import React, { useEffect } from "react";

function Library() {
  const supabase = clientSupabase;
  const tab = useTab((state: any) => state.tab);

  async function getAllImages() {
    const { data, error } = await supabase.storage
      .from("images")
      .list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
    if (!data) return;
    for (let i = 0; i < data.length; i++) {
      const { name } = data[i]; 
      console.log(data[i]);
      
      const { data: publicUrl } = supabase.storage
  .from("images")
  .getPublicUrl(`${name}`, {
    download: true,
  });
      console.log(publicUrl);
      
      
    }
      
  }

    useEffect(() => {
      getAllImages()
  }, []);

  return tab == "library" && (
    <div>Library</div>
  );
}

export default Library;
