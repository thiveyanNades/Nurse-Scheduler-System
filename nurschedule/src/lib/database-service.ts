import { createClient } from "@/utils/supabase/server";

export async function getShiftsByUserId(userId: string) {
  const supabase = await createClient();

  const { data: shifts, error } = await supabase
    .from("shifts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching shifts:", error);
    return [];
  }

  return shifts || [];
}
