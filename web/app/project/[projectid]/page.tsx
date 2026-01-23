"use client";
import React, { useEffect } from "react";
import { ProjectHeader } from "../_shared/ProjectHeader";
import SectionSettings from "../_shared/SectionSettings";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ProjectType, ScreenConfigType } from "@/type/types";
import { LoaderFive } from "@/components/ui/loader";
import Canvas from "../_shared/Canvas";
import { Loader } from "lucide-react";

const ProjectCanvasPlayground = () => {
  const [loading, setLoading] = useState(false);
  const { projectid } = useParams();
  const [projectDetail, setProjectDetail] = useState<ProjectType>();
  const [loadingMsg, setLoadingMsg] = useState("");
  // const [screenConfigOriginal, setScreenConfigOriginal] = useState<
  //   ScreenConfigType[[]]
  // >([]);
  const [screenConfig, setScreenConfig] = useState<ScreenConfigType[]>([]);

  useEffect(() => {
    projectid! && GetProjectDetail();
  }, []);

  const GetProjectDetail = async () => {
    setLoadingMsg("Generating Canvas...");
    setLoading(true);
    const result = await axios.get(`/api/project?projectId=` + projectid);
    setProjectDetail(result?.data?.projectDetail);
    // setScreenConfigOriginal(result?.data?.screenConfigOriginal);
    setScreenConfig(result?.data?.screenConfig);
    setLoading(false);
    setLoadingMsg("");
  };

  useEffect(() => {
    if (
      projectDetail &&
      screenConfig &&
      screenConfig.length == 0
    ) {
      // eslint-disable-next-line react-hooks/immutability
      generateScreenConfig();
    } else if (projectDetail && screenConfig) {
      // eslint-disable-next-line react-hooks/immutability
      GenerateScreenUIUX();
    }
  }, [screenConfig]);

  async function generateScreenConfig() {
    console.log("generating screen config");
    setLoadingMsg("Generating Screen Config...");
    setLoading(true);
    const result = await axios.post("/api/generate-config", {
      userInput: projectDetail?.userInput,
      deviceType: projectDetail?.device,
      projectId: projectid,
    });
    console.log(result);
    GetProjectDetail();
    setLoading(false);
  }

  async function GenerateScreenUIUX() {
    console.log("generating UIIX ");
    setLoadingMsg("Generating UI UX...");
    setLoading(true);

    for (let index = 0; index < screenConfig.length; index++) {
      const screen = screenConfig[index];
      if (screen?.code) continue;
      setLoadingMsg("Generating Screen " + index);
      const result = await axios.post("/api/generate-screen-ui", {
        projectId: projectid,
        screenId: screen.screenId,
        screenName: screen.screenName,
        purpose: screen.purpose,
        screenDescription: screen.screenDescription,
      });
      setScreenConfig((prev) =>
        prev.map((item, i) => (i === index ? result.data : item)),
      );
    }
    setLoading(false);
  }
  return (
    <div>
      <ProjectHeader />
      <div className="flex  ">
        {
          <div className="left-1/2 top-20 absolute  items-center">
            {loading && <LoaderFive text={loadingMsg} />}
          </div>
        }
        {/* settings */}
        {projectDetail ? (
          <SectionSettings projectDetail={projectDetail} />
        ) : (
          <Loader className="animate-spin" />
        )}
        {/* canvas */}
        <Canvas
          projectDetail={projectDetail}
          screenConfig={screenConfig}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProjectCanvasPlayground;
