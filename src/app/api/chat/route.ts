import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request, res: NextResponse) {
    const resp = await req.json();
    const assistant = await openai.beta.assistants.create({
      name: "Social media expert",
      instructions:
        "You are a personal social media expert on instagram, twitter and youtube.",
      model: "gpt-4-turbo-preview",
    });
  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: resp.text,
  });
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id:assistant.id,
  });
    const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  const messages = await openai.beta.threads.messages.list(thread.id);

  return NextResponse.json({ output: messages,status:runStatus }, { status: 200 });
}
