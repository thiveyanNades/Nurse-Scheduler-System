import { createClient } from "@/utils/supabase/server";
import { sendEmail } from "./email";
export async function getShiftsByUserId(userId: string) {
  const supabase = await createClient();

  const { data: shifts, error } = await supabase
    .from("shifts")
    .select("*, status")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching shifts:", error);
    return [];
  }

  return shifts || [];
}

export async function getUnfilledShifts() {
  const supabase = await createClient();

  const { data: shifts, error } = await supabase
    .from("shifts")
    .select("*")
    .eq("status", 0); // Filter for status == 0 (empty/dropped shifts)

  if (error) {
    console.error("Error fetching unfilled shifts:", error);
    return [];
  }

  return shifts || [];
}

///////////////////////////////////

// src/utils/supabase/shifts.ts

// async function logShiftChange(
//   userID: string,
//   shiftID: string,
//   description: string
// ) {
//   try {
//     const { data, error } = await supabase.from("shift_change_log").insert([
//       {
//         user_change: userID,
//         shift_date_effected: shiftID,
//         description: description,
//       },
//     ]);

//     if (error) {
//       console.error("Error logging shift change:", error);
//     }
//   } catch (error) {
//     console.error("Error logging shift change:", error);
//   }
// }

// Function to add a shift for a given user ID and shift ID
export async function addShift(
  user_id: string,
  date: string,
  time: boolean,
  status: boolean
) {
  try {
    const supabase = await createClient();

    // First, remove the existing "empty" shift
    const { data: deleteData, error: deleteError } = await supabase
      .from("shifts")
      .delete()
      .match({
        date,
        time,
        status: 0, // Ensure it's an "empty" shift (dropped shift)
      });

    if (deleteError) {
      console.error("Error deleting existing empty shift:", deleteError);
      return {}; // Or handle the error as needed
    }

    const { data, error } = await supabase
      .from("shifts")
      .insert([{ user_id, date, time, status }]);

    if (error) {
      console.error("Error adding shift:", error);
      return {};
    }

    return data;
  } catch (error) {
    console.error("Error adding shift:", error);
    return {};
  }
}

////////////////
// src/utils/supabase/shifts.ts

// Function to remove a shift for a given user ID and shift ID with a reason
export async function removeShift(shiftID: number, reason: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("shifts")
      .update({
        user_id: null,
        status: 0,
      })
      .eq("id", shiftID);

    if (error) {
      console.error("Error clearing shift:", error.message);
      return { success: false, error };
    }

    const emailsObject = await getEmails(); // Expecting { data: [...] } or possibly undefined

    const emailList = (emailsObject?.data ?? [])
      .map((entry) => entry.user_email)
      .filter((email) => email && email.trim() !== "");

    for (const email of emailList) {
      console.log(email);
      await sendEmail(email);
    }

    console.log(`Shift ${shiftID} cleared with reason: ${reason}`);
    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error };
  }
}

/////////////////////////

export async function removeShiftByUserID(
  user_id: string,
  date: string, // or Date if you're formatting it
  time: boolean,
  reason: string
) {
  try {
    const emailsObject = await getEmails(); // Expecting { data: [...] } or possibly undefined
    console.log(emailsObject);

    const supabase = await createClient();

    const { data, error } = (await supabase
      .from("shifts")
      .update({
        user_id: null,
        status: 0,
      })
      .match({
        user_id,
        date,
        time,
      })) as { data: any[] | null; error: any };

    const emailList = (emailsObject?.data ?? [])
      .map((entry) => entry.user_email)
      .filter((email) => email && email.trim() !== "");

    console.log("EMAILLIST: ", emailList);

    for (const email of emailList) {
      console.log(email);
      sendEmail(email);
    }

    if (error) {
      console.error("Error clearing shift:", error.message);
      return { success: false, error };
    }

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("No matching shift found to remove.");
      return { success: false, message: "No matching shift found." };
    }

    console.log(
      `Cleared shift for ${user_id} on ${date} (${
        time ? "day" : "night"
      }) — reason: ${reason}`
    );

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error };
  }
}

export async function addEmail(user_id: string, user_email: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("emails")
    .insert([{ user_id, user_email }]);

  if (error) {
    console.error("Insert error:", error.message);
    return { error };
  }

  return { data };
}

export async function getEmails() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("emails").select("*");

  if (error) {
    console.error("Insert error:", error.message);
    return { error };
  }

  return { data };
}
