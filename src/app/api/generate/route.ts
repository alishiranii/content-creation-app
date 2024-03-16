import { NextRequest } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


export async function POST(request: NextRequest) { 
    const { prompt } = await request.json();
    

}