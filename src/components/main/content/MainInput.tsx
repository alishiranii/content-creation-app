"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { clientSupabase } from "@/lib";
import { useSearchParams } from "next/navigation";
import { useTab } from "@/store/useStore";

function MainInput() {
  const [text, setText] = useState("");
  const searchParams = useSearchParams();
  const supabase = clientSupabase;
  const tab = useTab((state) => state.tab);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setText("")
    const projectID = searchParams.get("projectid");
    if (!projectID) {
      console.log("Missing project ID");
      return;
    }

    const { data, error } = await supabase
      .from("social")
      .select("messages")
      .eq("id", projectID);

    if (error) {
      console.log(error);
      return;
    }

    if (!data || !data[0]) {
      console.log("No record found with that project ID");
      return; 
    }

    const existingMessages = data[0].messages || [];

    const newMessage = { message: text, role: "user" };

    existingMessages.push(newMessage);

    const updateResult = await supabase
      .from("social")
      .update({ messages: existingMessages })
      .eq("id", projectID);
    if (updateResult.error) {
      console.log(updateResult.error);
    }
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        text,
        projectID
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return tab == "chat" && (
    <form
      onSubmit={handleSubmit}
      className="w-full relative p-3 flex items-center shadow-lg mt-auto">
      <input
        className="p-5 pl-14 rounded-xl w-full bg-[#0D0F10] placeholder:text-[#686B6E] placeholder:text-sm text-white"
        placeholder="You can ask me anything!"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <button
        type="submit"
        aria-label="submit button"
        className="absolute right-8 btn btn-ghost text-2xl text-white">
        <FiSend />
      </button>
    </form>
  );
}

export default MainInput;
