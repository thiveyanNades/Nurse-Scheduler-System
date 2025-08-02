import { NextRequest, NextResponse } from "next/server";
import { addEmail } from "@/lib/database-service";

export async function GET(req: NextRequest) {
  try {
    let users = await addEmail("useridhere", "randommail@gmail.com");

    return NextResponse.json({ users: users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
