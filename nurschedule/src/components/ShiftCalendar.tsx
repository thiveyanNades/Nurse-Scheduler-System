"use client";
import { useRouter } from "next/navigation";
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

function splitShiftsByTimeEmpty(shifts: { date: string; time: boolean }[]) {
  const emptyshifts: Date[] = [];

  for (const shift of shifts) {
    const [year, month, day] = shift.date.split("-").map(Number);
    const jsDate = new Date(year, month - 1, day);
    emptyshifts.push(jsDate);
  }

  return emptyshifts;
}

export default function CalendarClient({
  shifts,
  emptyshifts,
  userId,
}: {
  shifts: { date: string; time: boolean }[];
  emptyshifts: { date: string; time: boolean }[];
  userId: string;
}) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { dayShifts, nightShifts } = splitShiftsByTime(
    Array.isArray(shifts) ? shifts : []
  );
  const emptyshiftsCalendar = splitShiftsByTimeEmpty(
    Array.isArray(emptyshifts) ? emptyshifts : []
  );

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
    router.refresh();
  }

  return (
    <>
      {/* <p>{userId}</p> */}
      <Calendar
        className="rounded-xl"
        modifiers={{
          empty: emptyshiftsCalendar,
          days: dayShifts,
          nights: nightShifts,
        }}
        modifiersClassNames={{
          empty:
            "bg-purple-200 text-purple-800 ring-1 ring-purple-300 rounded-full",
          days: "bg-amber-200 text-amber-700 ring-1 ring-amber-200 rounded-full",
          nights: "bg-blue-200 text-blue-800 ring-1 ring-blue-300 rounded-full",
        }}
      />
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <label className="block">
          What would you like to do? :
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
