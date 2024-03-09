"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { clientSupabase } from "@/lib";
import { useSearchParams } from "next/navigation";

function MainInput() {
  const [text, setText] = useState("");
  const searchParams = useSearchParams();
  const supabase = clientSupabase;

  // async function handleSubmit(e: FormEvent) {
  //   e.preventDefault();
  //   const updateResult = await supabase
  //     .from("social")
  //     .update({
  //       messages: (existingMessages:any) => {
  //         return existingMessages
  //           ? existingMessages.concat({ message: text, role: "user" })
  //           : [{ message: text, role: "user" }];
  //       },
  //     })
  //     .eq("id", searchParams.get("projectid"));

  //   console.log(updateResult.data);
  //   if (updateResult.error) {
  //     console.log(updateResult.error);
  //   }
  //   // const res = await fetch("/api/robo", {
  //   //   method: "POST",
  //   //   body: JSON.stringify({
  //   //     text,
  //   //   }),
  //   //   headers: {
  //   //     "content-type": "application/json",
  //   //   },
  //   // });
  // }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Check for project ID
    const projectID = searchParams.get("projectid");
    if (!projectID) {
      console.log("Missing project ID");
      return; // Handle missing project ID
    }

    const { data, error } = await supabase
      .from("social")
      .select("messages")
      .eq("id", projectID);

    if (error) {
      console.log(error);
      return; // Handle error
    }

    if (!data || !data[0]) {
      console.log("No record found with that project ID");
      return; // Handle no record found
    }

    const existingMessages = data[0].messages || []; // Use empty array if messages is null

    const newMessage = { message: text, role: "user" };

    existingMessages.push(newMessage);

    const updateResult = await supabase
      .from("social")
      .update({ messages: existingMessages })
      .eq("id", projectID);

    console.log(updateResult.data);
    if (updateResult.error) {
      console.log(updateResult.error);
    }
  }

  return (
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
        type="button"
        className="absolute left-4 btn btn-ghost btn-circle text-2xl text-[#686B6E]">
        <CiMicrophoneOn />
      </button>
      <button
        type="submit"
        className="absolute right-8 btn btn-ghost text-2xl text-white">
        <FiSend />
      </button>
    </form>
  );
}

export default MainInput;
