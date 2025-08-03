import { NextRequest, NextResponse } from "next/server";
import { getEmails } from "@/lib/database-service";

export async function GET(req: NextRequest) {
  try {
    const emailsObject = await getEmails(); // Expecting { data: [...] } or possibly undefined

    const emailList = (emailsObject?.data ?? [])
      .map((entry) => entry.user_email)
      .filter((email) => email && email.trim() !== "");

    return NextResponse.json({ emails: emailList }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}
