import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  const { text } = await request.json();

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

    return NextResponse.json(output);
  } catch (error) {
    console.log(error);
    return NextResponse.json("An error occurred. Please try again later.", {
      status: 500,
    });
  }
}
