import { NextRequest, NextResponse } from "next/server";
import { addShift } from "@/lib/database-service";

export async function GET(req: NextRequest) {
  try {
    addShift(
      "dsjfkljskldjfkld",
      new Date(2025, 11, 25).toISOString(),
      true,
      true
    );
    const body = await req.json(); // parse JSON
    const message = body.message;

    console.log("Received message:", message);

    return NextResponse.json({ message: message }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
