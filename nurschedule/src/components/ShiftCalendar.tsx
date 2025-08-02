"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

function splitShiftsByTime(shifts: { date: string; time: boolean }[]): {
  dayShifts: Date[];
  nightShifts: Date[];
} {
  const dayShifts: Date[] = [];
  const nightShifts: Date[] = [];

  for (const shift of shifts) {
    const [year, month, day] = shift.date.split("-").map(Number);
    const jsDate = new Date(year, month - 1, day);
    (shift.time ? dayShifts : nightShifts).push(jsDate);
  }

  return { dayShifts, nightShifts };
}

export default function CalendarClient({
  shifts,
  userId,
}: {
  shifts: { date: string; time: boolean }[];
  userId: string;
}) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { dayShifts, nightShifts } = splitShiftsByTime(shifts);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/ai-input", {
      method: "POST",
      body: JSON.stringify({ message, user_id: userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      <p>{userId}</p>
      <Calendar
        className="rounded-xl"
        modifiers={{ days: dayShifts, nights: nightShifts }}
        modifiersClassNames={{
          days: "bg-blue-100 text-blue-700 ring-1 ring-blue-200 rounded-full",
          nights: "bg-blue-200 text-blue-800 ring-1 ring-blue-300 rounded-full",
        }}
      />
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <label className="block">
          Your Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 w-full border border-blue-300 rounded-md px-3 py-2 font-sans"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 font-sans"
        >
          Submit
        </button>
      </form>
      <div>{error}</div>
    </>
  );
}
