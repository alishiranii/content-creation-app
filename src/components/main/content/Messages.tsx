"use client";
import { clientSupabase } from "@/lib";
import { useTab } from "@/store/useStore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Key, useEffect, useState } from "react";

interface Message {
  role: string;
  message: string;
}

function Messages() {
  const tab = useTab((state: any) => state.tab);
  const [messages, setMessages] = useState<Message[]>();
  const [loading, setLoading] = useState(true);
  const supabase = clientSupabase;
  const searchParams = useSearchParams();
  const projectID = searchParams.get("projectid");

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
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessages();
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
      <div className="mb-auto mt-10 flex flex-col gap-5 max-h-[500px] overflow-y-auto">
        {messages &&
          messages?.map((m: any, i: Key) => {
            return (
              <div
                key={i}
                className={`chat ${
                  m.role == "user" ? "chat-end" : "chat-start"
                }`}>
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
      </div>
    )
  );
}

export default Messages;
