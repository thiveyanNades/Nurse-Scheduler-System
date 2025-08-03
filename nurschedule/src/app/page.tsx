"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to /dashboard
    router.push("/dashboard");
  }, [router]);

  return null; // Optional: or show a loading spinner
}
