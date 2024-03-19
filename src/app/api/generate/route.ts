import { serverSupabase } from "@/lib";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


export async function POST(request: NextRequest) { 
  const { prompt, width, height } = await request.json();
  
  const cookieStore = cookies();
  const supabase = serverSupabase(cookieStore);
    
  const output = await replicate.run(
    "lucataco/sdxl-lightning-4step:727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a",
    {
      input: {
        width,
        height,
        prompt,
        seed: 2992471961,
      },
    }
  );

  return NextResponse.json(output);
}