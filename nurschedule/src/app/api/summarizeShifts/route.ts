// route.ts

import { NextResponse } from 'next/server';
import { generateNurseSummary } from '@/lib/llm-service';

export async function GET() {
  const user_id = "N1";

  const targetShifts: { date: string; time: "day" | "night" }[] = [
    { date: "2025-08-01", time: "day" },
    { date: "2025-08-02", time: "night" },
    { date: "2025-08-03", time: "day" },
  ];

const allNurseShifts: Record<string, { date: string; time: "day" | "night" }[]> = {
  N1: targetShifts,
  N2: [
    { date: "2025-08-01", time: "night" },
    { date: "2025-08-02", time: "day" },
  ],
  N3: [
    { date: "2025-08-01", time: "day" },
    { date: "2025-08-02", time: "night" },
    { date: "2025-08-04", time: "night" },
  ],
};


  try {
    const summary = await generateNurseSummary(user_id, targetShifts, allNurseShifts);
    return NextResponse.json({ summary });
  } catch (err) {
    console.error('Error generating summary:', err);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
