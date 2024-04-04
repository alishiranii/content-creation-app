"use client";
import { clientSupabase } from "@/lib";
import { useTab } from "@/store/useStore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Key, useEffect, useRef, useState } from "react";

interface Message {
  role: string;
  message: string;
}

function Messages() {
  const tab = useTab((state) => state.tab);
  const [messages, setMessages] = useState<Message[]>();
  const [loading, setLoading] = useState<boolean>();
  const supabase = clientSupabase;
  const searchParams = useSearchParams();
  const projectID = searchParams.get("projectid");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  async function fetchMessages() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("social")
        .select("messages")
        .eq("id", projectID);
      if (!data || !data[0] || error) {
        console.log("No record found with that project ID");
        return; // Handle no record found
      }
      setMessages(data[0].messages);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (projectID) {
      fetchMessages();
    }
  }, [projectID]);

  useEffect(() => {
    const subscription = supabase
      .channel("social")
      .on(
        "postgres_changes",
        {
          event: "UPDATE", // Listen only to UPDATEs
          schema: "public",
        },
        (payload) => fetchMessages()
      )
      .subscribe();
  }, []);

  return (
    tab == "chat" && (
      <div className="mb-auto mt-10 flex flex-col gap-5 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent">
        {messages &&
          messages?.map((m: any, i: Key) => {
            return (
              <div
                key={i}
                className={`chat ${
                  m.role == "user" ? "chat-end" : "chat-start"
                }`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    {m.role == "bot" && (
                      <Image
                        src={"/Avatar.jpg"}
                        alt="avatar"
                        width={50}
                        height={50}
                      />
                    )}
                    {m.role == "user" && (
                      <Image
                        src={"/avatar1.jpg"}
                        alt="avatar"
                        width={50}
                        height={50}
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`chat-bubble ${
                    m.role == "user" && "chat-bubble-primary"
                  }`}>
                  {m.message}
                </div>
              </div>
            );
          })}
        {loading && (
          <div className="loading loading-dots w-14 text-green-700 mx-auto"></div>
        )}
        <div ref={messagesEndRef} />
      </div>
    )
  );
}

export default Messages;
