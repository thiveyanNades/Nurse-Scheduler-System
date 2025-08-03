import { NextRequest, NextResponse } from "next/server";
import { addEmail } from "@/lib/database-service";
import { getUnfilledShifts } from "@/lib/database-service";

export async function GET(req: NextRequest) {
  try {
    // let users = await addEmail("useridhere", "randommail@gmail.com");
    let shifts = await getUnfilledShifts();

    return NextResponse.json({ shifts: shifts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
