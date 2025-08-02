// "use client";

// import React from "react";
// import { useState } from "react";
// // import { createClient } from "@/utils/supabase/server";
// import { createClient } from "@/utils/supabase/client";
// import { Calendar } from "@/components/ui/calendar";
// import { redirect } from "next/navigation";
// import { getShiftsByUserId } from "@/lib/database-service";

// // Helper: Convert shifts to day/night Date arrays
// function splitShiftsByTime(
//   shifts: {
//     date: string;
//     time: boolean;
//   }[]
// ): {
//   dayShifts: Date[];
//   nightShifts: Date[];
// } {
//   const dayShifts: Date[] = [];
//   const nightShifts: Date[] = [];

//   for (const shift of shifts) {
//     const [year, month, day] = shift.date.split("-").map(Number);
//     const jsDate = new Date(year, month - 1, day);
//     if (shift.time) {
//       dayShifts.push(jsDate);
//     } else {
//       nightShifts.push(jsDate);
//     }
//   }

//   return { dayShifts, nightShifts };
// }

// export default async function Page() {
//   const [message, setMessage] = useState("");
//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const res = await fetch("/api/ai-input", {
//       method: "POST",
//       body: JSON.stringify({ message }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await res.json();
//     console.log(data); // optionally show a toast or alert
//   }
//   const supabase = await createClient();

//   const { data, error } = await supabase.auth.getUser();
//   if (error || !data?.user) {
//     redirect("/login");
//   }

//   const shifts = await getShiftsByUserId(data.user.id);
//   const { dayShifts, nightShifts } = splitShiftsByTime(shifts);

//   return (
//     <>
//       <p>{data.user.id}</p>
//       <Calendar
//         modifiers={{
//           days: dayShifts,
//           nights: nightShifts,
//         }}
//         modifiersClassNames={{
//           days: "bg-green-500/20 text-green-800 ring-1 ring-green-400 rounded-full",
//           nights:
//             "bg-blue-500/20 text-blue-800 ring-1 ring-blue-400 rounded-full",
//         }}
//       />
//       <form onSubmit={handleSubmit} method="POST" className="space-y-4">
//         <label className="block">
//           Your Message:
//           <input
//             type="text"
//             name="message"
//             required
//             className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </label>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>
//     </>
//   );
// }
import { createClient } from "@/utils/supabase/server";
import { getShiftsByUserId } from "@/lib/database-service";
import CalendarClient from "../../components/ShiftCalendar";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const shifts = await getShiftsByUserId(data.user.id);

  return (
    <>
      <CalendarClient shifts={shifts} userId={data.user.id} />
      <div>{error}</div>
    </>
  );
}
