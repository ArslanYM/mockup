"use client";
import React, { useEffect } from "react";
import { ProjectHeader } from "../_shared/ProjectHeader";
import SectionSettings from "../_shared/SectionSettings";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ProjectType, ScreenConfigType } from "@/type/types";
import { LoaderFive } from "@/components/ui/loader";

const ProjectCanvasPlayground = () => {
  const [loading, setLoading] = useState(false);
  const { projectid } = useParams();
  const [projectDetail, setProjectDetail] = useState<ProjectType>();
  const [loadingMsg, setLoadingMsg] = useState("");
  const [screenConfig, setScreenConfig] = useState<ScreenConfigType[]>([]);

  const GetProjectDetail = async () => {
    setLoadingMsg("Generating Canvas...");
    setLoading(true);
    const result = await axios.get(`/api/project?projectId=` + projectid);
    setProjectDetail(result?.data?.projectDetail);
    setScreenConfig(result?.data?.screenConfig);

    // if (result?.data?.screenConfig.length == 0) {
    //   // eslint-disable-next-line react-hooks/immutability
    //   generateScreenConfig();
    // }
    setLoading(false);
    setLoadingMsg("");
  };
  useEffect(() => {
    projectid! && GetProjectDetail();
  }, []);

  useEffect(() => {
    if (projectDetail && screenConfig && screenConfig.length == 0) {
      // eslint-disable-next-line react-hooks/immutability
      generateScreenConfig();
    } else if (projectDetail && screenConfig) {
      // eslint-disable-next-line react-hooks/immutability
      GenerateScreenUIUX();
    }
  }, [projectDetail && screenConfig]);

  async function generateScreenConfig() {
    setLoadingMsg("Generating Screen Config...");
    setLoading(true);
    const result = await axios.post("/api/generate-config", {
      userInput: projectDetail?.userInput,
      deviceType: projectDetail?.device,
      projectId: projectid,
    });
    GetProjectDetail();
    setLoading(false);
  }

  async function GenerateScreenUIUX() {
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
      <div>
        {
          <div className="left-1/2 top-20 absolute  items-center">
            {loading && <LoaderFive text={loadingMsg} />}
          </div>
        }
        {/* settings */}
        <SectionSettings projectDetail={projectDetail} />
        {/* canvas */}
      </div>
    </div>
  );
};

export default ProjectCanvasPlayground;
