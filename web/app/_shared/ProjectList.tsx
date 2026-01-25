"use client";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { ProjectType } from "@/type/types";
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(false);
  async function getProjectList() {
    setLoading(true);
    const result = await axios.get("/api/project");
    setProjects(result.data);
    setLoading(false);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProjectList();
  }, []);

  return (
    <>
      {
        <>
          projects.length == 0? <></> :
          <div className="flex flex-col justify-center text-center py-30">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                My Projects
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Continue back from where you had left...
              </p>
            </div>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10  max-w-7xl mx-auto">
            {loading ? (
              <>
                <div className="">
                  <Loader /> Loading...
                </div>
              </>
            ) : (
              <>
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </>
            )}
          </div>
        </>
      }
    </>
  );
};

type Props = {
  project: ProjectType;
};
export function ProjectCard({ project }: Props) {
  return (
    <Link href={"/project" + "/" + project.projectId}>
      <div className="flex items-center justify-center cursor-pointer">
        <DirectionAwareHover imageUrl={project.screenShot as string}>
          <p className="font-bold text-xl">{project.projectName}</p>
          <p className="font-normal text-sm">{project.createdOn}</p>
        </DirectionAwareHover>
      </div>
    </Link>
  );
}
export default ProjectList;
