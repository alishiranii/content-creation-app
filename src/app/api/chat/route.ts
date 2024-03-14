import { serverSupabase } from "@/lib";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  const { text, projectID } = await request.json();

  const cookieStore = cookies();
  const supabase = serverSupabase(cookieStore);

  const { data, error } = await supabase
    .from("social")
    .select("messages")
    .eq("id", projectID);
  
  if (!data || !data[0]) {
    console.log("No record found with that project ID");
    return; // Handle no record found
  }
  
  const existingMessages = data[0].messages || [];

  try {
    const output = await replicate.run(
      // This is the ID of the replicate model you are running
      "meta/llama-2-70b-chat",
      {
        input: {
          prompt: text,
          system_prompt:
            "you are the one-stop shop for social media domination on Instagram, YouTube, and Twitter!",
        },
      }
    );
    
    

    if (Array.isArray(output)) {
      const newMessage = { message: output.join(''), role: "bot" };
      existingMessages.push(newMessage);
      const updateResult = await supabase
        .from("social")
        .update({ messages: existingMessages })
        .eq("id", projectID);
      return NextResponse.json(newMessage);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("An error occurred. Please try again later.", {
      status: 500,
    });
  }
}
