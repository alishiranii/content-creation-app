"use client"
import { clientSupabase } from "@/lib";
import { useTab } from "@/store/useStore";
import React, { useEffect } from "react";

function Library() {
  const supabase = clientSupabase;
  const tab = useTab((state: any) => state.tab);

  async function getAllImages() {
    
      
  }

    useEffect(() => {
      getAllImages()
  }, []);

  return tab == "library" && (
    <div>Library</div>
  );
}

export default Library;
