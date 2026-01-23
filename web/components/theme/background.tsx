"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beams";

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden antialiased">
      <BackgroundBeams />
    </div>
  );
}
