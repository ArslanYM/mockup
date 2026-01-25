"use client";

import Image from "next/image";
import { Loader, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { useContext, useState } from "react";
import { SettingContext } from "@/context/SettingContext";
import axios from "axios";
import { toast } from "sonner";

export function ProjectHeader({}) {
  const { settingDetail, setSettingDetail } = useContext(SettingContext);
  const [loading, setLoading] = useState(false);

  const saveChanges = async () => {
    try {
      setLoading(true);
      const result = await axios.put("/api/project", {
        theme: settingDetail.theme,
        projectId: settingDetail.projectId,
        projectName: settingDetail.projectName,
      });

      console.log(result);
      setLoading(false);
      toast.success("Setting Saved!");
    } catch (error) {
      setLoading(false);
      toast.error("Internal Server Error");
    }
  };
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
          <ModeToggle />
          <Button
            disabled={loading}
            className="cursor-pointer"
            onClick={saveChanges}
          >
            {loading ? (
              <>
                {" "}
                <Loader className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save />
                Save{" "}
              </>
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
}
