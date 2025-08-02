import { NextRequest, NextResponse } from "next/server";
import { removeShift } from "@/lib/database-service";

export async function GET(req: NextRequest) {
  try {
    removeShift(13, "I felt like it");
    return NextResponse.json({ message: "did it" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
