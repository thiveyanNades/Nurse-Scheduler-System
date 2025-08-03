// lib/llm-service.ts

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

/**
 * Parses a shift-related natural language prompt into structured JSON.
 * @param promptText The user's natural language input (e.g. "Drop my night shift on August 5th")
 * @returns A JSON object with { action, date, time }
 */
export async function parseShiftRequest(promptText: string): Promise<{
  action: string | null;
  date: string | null;
  time: 'day' | 'night' | null;
}> {
  const prompt = `
You are an assistant that converts shift requests into structured JSON format.
The user will specify whether they want to "add" or "drop" a shift, along with the date and whether it’s a day or night shift.
Extract this information and return it strictly in this JSON format:

Today's date is: ${new Date().toDateString()}
It is 2025

{
  "action": "add" | "drop" | null,
  "date": "YYYY-MM-DD" | null,
  "time": "day" | "night" | null
}

If the user input does not clearly specify any of the three fields, return null for that field.

User input: "${promptText}"
`;

  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash-lite",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  let fullText = "";
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  try {
    const jsonStart = fullText.indexOf("{");
    const jsonEnd = fullText.lastIndexOf("}");
    const jsonString = fullText.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON:", fullText);
    return {
      action: null,
      date: null,
      time: null,
    };
  }
}

/**
 * Generates a professional summary of a nurse's shift history compared to others.
 * @param user_id The nurse's ID
 * @param targetShifts Array of shifts for the nurse: [{ date, time }]
 * @param allNurseShifts Object mapping user_id -> [{ date, time }]
 * @returns Summary string
 */
export async function generateNurseSummary(
  user_id: string,
  targetShifts: { date: string; time: 'day' | 'night' }[],
  allNurseShifts: Record<string, { date: string; time: 'day' | 'night' }[]>
): Promise<string> {
  const formatShifts = (shifts: { date: string; time: 'day' | 'night' }[]) =>
    shifts.map(s => `- ${s.time} shift on ${s.date}`).join("\n");

  const currentNurseShifts = formatShifts(targetShifts);

  const otherSummaries = Object.entries(allNurseShifts)
    .filter(([id]) => id !== user_id)
    .map(([id, shifts]) => `Nurse ${id}:\n${formatShifts(shifts)}`)
    .join("\n\n");

  const prompt = `
You are a senior healthcare operations analyst. Your job is to review and summarize nurses’ shift patterns, reliability, and preferences.
Your tone should be professional but human, and your analysis should reflect insight into their scheduling behavior.

Below is the shift history for Nurse ${user_id}:

${currentNurseShifts}

Below are the shift patterns of other nurses in the same team:

${otherSummaries}

Now, write a detailed summary of Nurse ${user_id}'s shift activity. Compare it with other nurses to highlight any trends, strengths, or inconsistencies.
Mention consistency, night/day preference, unusual behavior, and provide feedback for improvement or appreciation.

Avoid repeating raw stats unless needed for context. Think like a team manager giving insightful performance feedback.
`;

  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash-lite",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  let fullText = "";
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  return fullText.trim();
}
