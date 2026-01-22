import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import React from "react";

function SectionSettings() {
  return (
    <>
      <div className=" border-r w-[300px] h-[90vh] p-5 ">
        <h2 className="font-medium text-xl">Settings</h2>
        <div className="mt-6">
          <h2 className="text-sm mb-1">Project Name</h2>
          <Input placeholder="Project Name" />
        </div>
        <div className="mt-5">
          <h2 className="text-sm mb-1">Generate New Screen </h2>
          <Textarea placeholder="Enter Prompt To Generate New Screen.." />
          <Button size={"sm"} className="mt-3 w-full  cursor-pointer">
            {" "}
            <Sparkles /> Generate With Prompt
          </Button>
        </div>
        <div className="mt-5">
          <h2 className="text-sm mb-1">Themes </h2>
        </div>
      </div>
    </>
  );
}

export default SectionSettings;
