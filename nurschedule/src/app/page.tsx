import React from "react";
import { Calendar } from "@/components/ui/calendar";

function Homepage() {
  return (
    <div className="mx-auto max-w-md p-4">
      <h1>Shift Calendar</h1>
      <Calendar />
    </div>
  );
}

export default Homepage;
