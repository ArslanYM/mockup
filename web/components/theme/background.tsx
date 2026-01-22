"use client";
import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";

export function BackgroundBoxes() {
  return (
    // TODO: fix the background to have animation everywhere somehow
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Mask layer */}
      <div className="absolute inset-0 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Animated boxes */}
      <Boxes />
    </div>
  );
}
