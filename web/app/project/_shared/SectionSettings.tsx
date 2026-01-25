"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderFive } from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { RefreshDataContext } from "@/context/RefreshDataContext";
import { SettingContext } from "@/context/SettingContext";
import { THEME_NAME_LIST, THEMES } from "@/data/Themes";
import { ProjectType } from "@/type/types";
import axios from "axios";
import { Camera, Loader, Share, Sparkles } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  projectDetail: ProjectType | undefined;
  screenDescription?: string | undefined;
};
function SectionSettings({ projectDetail, screenDescription }: Props) {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [projectName, setProjectName] = useState("");
  const [userNewScreenInput, setuserNewScreenInput] = useState("");
  const { settingDetail, setSettingDetail } = useContext(SettingContext);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading...");
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, react-hooks/set-state-in-effect
    projectDetail && setProjectName(projectDetail?.projectName);
    setSelectedTheme(projectDetail?.theme as string);
  }, [projectDetail]);

  function onSelectTheme(theme: string) {
    setSelectedTheme(theme);
    setSettingDetail((prev: any) => ({
      ...prev,
      theme: theme,
    }));
  }

  function GenerateNewScreen() {
    try {
      setLoading(true);

      const result = axios.post("/api/generate-config", {
        userInput: userNewScreenInput,
        projectId: projectDetail?.projectId,
        deviceType: projectDetail?.device,
        projectName: projectDetail?.projectName,
        theme: projectDetail?.theme,
        oldScreenDescription: screenDescription,
      });

      setRefreshData({ method: "screenConfig", date: Date.now() });
      setLoading(false);
    } catch (error) {
      toast.error("Error generating the screen, try again...");
      setLoading(false);
    }
  }

  return (
    <>
      <div className=" border-r w-[300px] h-[90vh] p-5 ">
        <h2 className="font-medium text-xl">Settings</h2>
        {loading && <LoaderFive text={loadingMsg} />}
        <div className="mt-6">
          <h2 className="text-sm mb-1">Project Name</h2>
          <Input
            value={projectName || ""}
            onChange={(e) => {
              setProjectName(e.target.value);
              setSettingDetail((prev: any) => ({
                ...prev,
                projectName: projectName,
              }));
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
          <Button
            disabled={loading}
            onClick={() => {
              GenerateNewScreen();
            }}
            size={"sm"}
            className="mt-3 w-full  cursor-pointer"
          >
            {loading ? (
              <>
                <Loader className=" animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles /> Generate With Prompt
              </>
            )}{" "}
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
                      onSelectTheme(theme);
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
