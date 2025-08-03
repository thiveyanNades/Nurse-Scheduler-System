import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { getShiftsByUserId, getUnfilledShifts } from "@/lib/database-service";
import CalendarClient from "../../components/ShiftCalendar";
import { redirect } from "next/navigation";
import { UserCircle } from "lucide-react";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const shifts = await getShiftsByUserId(data.user.id);
  const emptyshifts = await getUnfilledShifts();
  const userName = data.user.user_metadata?.name || data.user.email;
  console.log("Fetched shifts:", shifts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-md">
        <CardHeader className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            {/* <UserCircle className="text-indigo-600 w-8 h-8" /> */}
            <img
              src="https://media.discordapp.net/attachments/1400968359360594112/1401535369492697198/2025-08-03_01.27.48.png?ex=6890a107&is=688f4f87&hm=60b62de7b58135cc3599b17835b0467fe117569bd6364604fb0e6216e12244bd&=&format=webp&quality=lossless"
              alt="My logo"
              width={96} // in pixels
              height={96} // in pixels
            />
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Welcome, {userName} 👋
            </CardTitle>
          </div>
          <CardDescription className="text-md text-gray-600">
            Here's your upcoming shift schedule. Stay on top of your
            responsibilities.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <CalendarClient
            shifts={shifts}
            emptyshifts={emptyshifts}
            userId={data.user.id}
          />
          {/* {error && <div className="text-red-500">Error: {error.message}</div>} */}
        </CardContent>
      </Card>
    </div>
  );
}
