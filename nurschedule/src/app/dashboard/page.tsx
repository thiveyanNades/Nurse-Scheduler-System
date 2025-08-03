import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { createClient } from "@/utils/supabase/server";
import { getShiftsByUserId } from "@/lib/database-service";
import CalendarClient from "../../components/ShiftCalendar";
import { redirect } from "next/navigation";
import { UserCircle } from "lucide-react"; // Icon for UI enhancement

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const shifts = await getShiftsByUserId(data.user.id);
  const userName = data.user.user_metadata?.name || data.user.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-md">
        <CardHeader className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <UserCircle className="text-indigo-600 w-8 h-8" />
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
          <CalendarClient shifts={shifts} userId={data.user.id} />
          {/* {error && <div className="text-red-500">Error: {error.message}</div>} */}
        </CardContent>
      </Card>
    </div>
  );
}
