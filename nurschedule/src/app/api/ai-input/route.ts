import { NextRequest, NextResponse } from "next/server";
import { parseShiftRequest } from "@/lib/llm-service";
import {
  addShift,
  removeShift,
  removeShiftByUserID,
} from "@/lib/database-service";
import { dayPickerContext } from "react-day-picker";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // parse JSON
    const request = await parseShiftRequest(body.message);
    const user_id = body.user_id;
    console.log(user_id);

    let date = request.date;
    let timeBoolean = false;
    let action = request.action;
    let time = request.time;

    if (request.action === null) {
      return NextResponse.json({ error: "specify action" }, { status: 400 });
    }
    if (request.date === null) {
      return NextResponse.json({ error: "specify date" }, { status: 400 });
    }
    if (request.time === null) {
      return NextResponse.json({ error: "specify time" }, { status: 400 });
    }

    const dateISO = new Date(request.date);
    if (isNaN(dateISO.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Convert "day" or "night" to boolean
    // const timeBoolean = request.time === "day" ?? "night";

    if (time === "day") {
      timeBoolean = true;
    }

    if (time === "night") {
      timeBoolean = false;
    }

    if (request.action === "drop") {
      // Make sure to await this if it's async
      await removeShiftByUserID(
        user_id,
        dateISO.toISOString().split("T")[0],
        timeBoolean,
        ""
      );
    }

    if (request.action === "add") {
      //   user_id: string,
      //   date: string,
      //   time: boolean,
      //   status: boolean
      await addShift(
        user_id,
        dateISO.toISOString().split("T")[0],
        timeBoolean,
        true
      );
    }

    console.log("Processed shift removal:", dateISO, timeBoolean);
    return NextResponse.json({ request }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
