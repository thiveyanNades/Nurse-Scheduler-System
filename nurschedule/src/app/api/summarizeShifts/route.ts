// app/api/summarize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseAdmin';
import { generateNurseSummary } from '@/lib/llm-service';

export async function POST(req: NextRequest) {
  try {
    // Parse user_id from request body
    const { user_id } = await req.json();

    // Fetch all shifts from Supabase
    const { data: shifts, error } = await supabase
      .from('shifts')
      .select('user_id, date, time');

    if (error) throw error;

    // Organize shifts by nurse user_id
    const nurseShifts: Record<string, { date: string; time: 'day' | 'night' }[]> = {};

    for (const shift of shifts) {
      if (!nurseShifts[shift.user_id]) nurseShifts[shift.user_id] = [];
      const time = shift.time === 'day' ? 'day' : 'night';
      nurseShifts[shift.user_id].push({
        date: shift.date,
        time,
      });
    }

    // If no user_id sent or invalid, return error
    if (!user_id || !nurseShifts[user_id]) {
      return NextResponse.json(
        { error: 'Missing or invalid user_id' },
        { status: 400 }
      );
    }

    // Generate summary only for requested nurse
    const summary = await generateNurseSummary(
      user_id,
      nurseShifts[user_id],
      nurseShifts
    );

    return NextResponse.json({ summary });
  } catch (err) {
    console.error('Error generating nurse summary:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
