"use client";

import Image from "next/image";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectHeader({}) {
  return (
    <header className="border-b bg-background ">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href={"/"} className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt={"Mockup Arrow Logo"}
            width={32}
            height={32}
            className="size-8 dark:invert"
          />
          <span className="mr-6 text-xl font-semibold">{"Mockup"}</span>
        </a>

        <div className="hidden items-center gap-4 md:flex">
          <Button>
            <Save /> Save
          </Button>
        </div>
      </nav>
    </header>
  );
}
