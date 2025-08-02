// /app/api/ai-input/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // parse JSON
    const message = body.message;

    console.log("Received message:", message);

    return NextResponse.json({ message: message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
