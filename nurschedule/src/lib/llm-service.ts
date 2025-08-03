// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

/**
 * Parses a shift-related natural language prompt into structured JSON.
 * @param promptText The user's natural language input (e.g. "Drop my night shift on August 5th")
 * @returns A JSON object with { action, date, time }
 */
export async function parseShiftRequest(promptText: string): Promise<{
  action: string | null;
  date: string | null;
  time: string | null;
}> {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are an assistant that converts shift requests into structured JSON format.
The user will specify whether they want to "add" or "drop" a shift, along with the date and whether it’s a day or night shift.
Extract this information and return it strictly in this JSON format:

It is 2025
{
  "action": "add" | "drop" | null,
  "date": "YYYY-MM-DD" | null,
  "time": "day" | "night" | null
  }
  
  If the user input does not clearly specify any of the three fields, return null for that field.
  If the user input specifies a time that is not "day" or "night", return null for the time field.
  
  Examples:
  User input: "Add a day shift on August 5th"
  Output: { "action": "add", "date": "2025-08-05", "time": "day" }
  User input: "Drop my night shift on August 6th"
  Output: { "action": "drop", "date": "2025-08-06", "time": "night" }
  
  Today's date is: ${new Date().toDateString()}
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

  // Extract and return parsed JSON safely
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
