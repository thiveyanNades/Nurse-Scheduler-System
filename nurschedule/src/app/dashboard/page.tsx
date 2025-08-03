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

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const shifts = await getShiftsByUserId(data.user.id);

  return (
    <div className="container flex items-center justify-center h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Your Shift Calendar</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CalendarClient shifts={shifts} userId={data.user.id} />
          <div>{error}</div>
        </CardContent>
      </Card>
    </div>
  );
}
