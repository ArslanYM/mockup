import React, { useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import ScreenFrame from "./ScreenFrame";
import { ProjectType, ScreenConfigType } from "@/type/types";
import { Minus, Plus, RefreshCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  projectDetail: ProjectType | undefined;
  screenConfig: ScreenConfigType[];
  loading: boolean;
};
const Canvas = ({ projectDetail, screenConfig, loading }: Props) => {
  const [panningEnabled, setPanningEnabled] = useState(true);
  const isMobile = projectDetail?.device == "mobile";

  const SCREEN_W = isMobile ? 400 : 1200;
  const SCREEN_H = isMobile ? 800 : 800;
  const GAP = isMobile ? 30 : 70;

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
      <div className="text-white  tools absolute p-3 px-5 bg-primary shadow flex gap-3 border bottom-10 left-1/2 z-30">
        <Button variant={"ghost"} size={"sm"} onClick={() => zoomIn()}>
          <Plus />
        </Button>
        <Button variant={"ghost"} size={"sm"} onClick={() => zoomOut()}>
          <Minus />
        </Button>
        <Button variant={"ghost"} size={"sm"} onClick={() => resetTransform()}>
          <RefreshCcw />
        </Button>
      </div>
    );
  };
  return (
    <div
      className="w-full h-screen cursor-pointer bg-primary-foreground/10"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <TransformWrapper
        initialScale={0.4}
        minScale={0.4}
        maxScale={3}
        initialPositionX={50}
        initialPositionY={50}
        limitToBounds={false}
        wheel={{ step: 0.8 }}
        doubleClick={{ disabled: false }}
        panning={{ disabled: !panningEnabled }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <Controls />
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
            >
              {screenConfig.map((screen, index) => (
                <ScreenFrame
                  key={index}
                  x={index * (SCREEN_W + GAP)}
                  y={0}
                  width={SCREEN_W}
                  height={SCREEN_H}
                  setPanningEnabled={setPanningEnabled}
                  htmlCode={screen?.code}
                  projectDetail={projectDetail}
                  screen={screen}
                />
              ))}
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Canvas;
