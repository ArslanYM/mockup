"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { THEME_NAME_LIST, THEMES } from "@/data/Themes";
import { ProjectType } from "@/type/types";
import { Camera, Share, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  projectDetail: ProjectType | undefined;
};
function SectionSettings({ projectDetail }: Props) {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [projectName, setProjectName] = useState(projectDetail?.projectName);
  const [userNewScreenInput, setuserNewScreenInput] = useState("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, react-hooks/set-state-in-effect
    projectDetail && setProjectName(projectDetail?.projectName);
  }, [projectDetail]);

  return (
    <>
      <div className=" border-r w-[300px] h-[90vh] p-5 ">
        <h2 className="font-medium text-xl">Settings</h2>
        <div className="mt-6">
          <h2 className="text-sm mb-1">Project Name</h2>
          <Input
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
            placeholder="Project Name"
          />
        </div>
        <div className="mt-5">
          <h2 className="text-sm mb-1">Generate New Screen </h2>
          <Textarea
            onChange={(e) => [setuserNewScreenInput(e.target.value)]}
            placeholder="Enter Prompt To Generate New Screen.."
          />
          <Button size={"sm"} className="mt-3 w-full  cursor-pointer">
            {" "}
            <Sparkles /> Generate With Prompt
          </Button>
        </div>
        <div className="mt-5">
          <h2 className="text-sm mb-1">Themes </h2>
          <div className="h-[200px] overflow-auto">
            <div>
              {THEME_NAME_LIST.map((theme, index) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedTheme(theme);
                    }}
                    key={index}
                    className={`${theme == selectedTheme && `border-primary bg-primary/20`} border p-2 m-2 cursor-pointer hover:animate-pulse`}
                  >
                    <h2>{theme}</h2>
                    <div className="flex flex-row gap-2 ">
                      <div
                        className="h-4 w-4"
                        style={{ background: THEMES[theme].primary }}
                      />
                      <div
                        className="h-4 w-4"
                        style={{ background: THEMES[theme].secondary }}
                      />
                      <div
                        className="h-4 w-4"
                        style={{ background: THEMES[theme].accent }}
                      />
                      <div
                        className="h-4 w-4"
                        style={{ background: THEMES[theme].background }}
                      />
                      <div
                        className="h-4 w-4 "
                        style={{
                          background: `linear-gradient(135deg, ${THEMES[theme].background},${THEMES[theme].primary},${THEMES[theme].accent} )`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-5 items-center gap-2 flex justify-center">
          <Button
            size={"sm"}
            variant={"outline"}
            className="mt-3  cursor-pointer"
          >
            {" "}
            <Camera /> Screenshot
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            className="mt-3  cursor-pointer"
          >
            {" "}
            <Share /> Share
          </Button>
        </div>
      </div>
    </>
  );
}

export default SectionSettings;
