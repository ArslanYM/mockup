import React, { useEffect, useRef, useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import ScreenFrame from "./ScreenFrame";
import { ProjectType, ScreenConfigType } from "@/type/types";
import { Minus, Plus, RefreshCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import axios from "axios";

type Props = {
  projectDetail: ProjectType | undefined;
  screenConfig: ScreenConfigType[];
  loading: boolean;
  takeScreenshot: any;
};
const Canvas = ({
  projectDetail,
  screenConfig,
  loading,
  takeScreenshot,
}: Props) => {
  const [panningEnabled, setPanningEnabled] = useState(true);
  const isMobile = projectDetail?.device == "mobile";
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

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

  useEffect(() => {
    takeScreenshot && onTakeScreenshot();
  }, [takeScreenshot]);

  const captureOneIframe = async (iframe: HTMLIFrameElement) => {
    const doc = iframe.contentDocument;
    if (!doc) throw new Error("iframe doc not ready");

    // wait fonts if possible
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    if (doc.fonts?.ready) await doc.fonts.ready;

    // let iconify/tailwind apply
    await new Promise((r) => setTimeout(r, 250));

    const target = doc.body; // or doc.documentElement
    const w = doc.documentElement.scrollWidth;
    const h = doc.documentElement.scrollHeight;

    const canvas = await html2canvas(target, {
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      width: w,
      height: h,
      windowWidth: w,
      windowHeight: h,
      scale: window.devicePixelRatio || 1,
    });

    return canvas;
  };

  const onTakeScreenshot = async (saveOnly = false) => {
    try {
      const iframes = iframeRefs.current.filter(Boolean) as HTMLIFrameElement[];
      if (!iframes.length) {
        toast.error("No iframes found to capture");
        return;
      }

      // 1) capture each iframe to its own canvas
      const shotCanvases: HTMLCanvasElement[] = [];
      for (let i = 0; i < iframes.length; i++) {
        const c = await captureOneIframe(iframes[i]);
        shotCanvases.push(c);
      }

      // 2) stitch into one final canvas (side-by-side)
      const scale = window.devicePixelRatio || 1;
      const headerH = 40; // same as your header
      const outW =
        Math.max(iframes.length * (SCREEN_W + GAP), SCREEN_W) * scale;
      const outH = SCREEN_H * scale;

      const out = document.createElement("canvas");
      out.width = outW;
      out.height = outH;

      const ctx = out.getContext("2d");
      if (!ctx) throw new Error("No 2D context");

      // optional transparent background
      ctx.clearRect(0, 0, outW, outH);

      // draw each screen capture
      for (let i = 0; i < shotCanvases.length; i++) {
        const x = i * (SCREEN_W + GAP) * scale;
        const y = headerH * scale; // because iframe capture is body only
        ctx.drawImage(shotCanvases[i], x, y);
      }

      // 3) download
      const url = out.toDataURL("image/png");
      updateProjectWithScreenshot(url);
      if (!saveOnly) {
        const a = document.createElement("a");
        a.href = url;
        a.download = "canvas.png";
        a.click();
      }
    } catch (e) {
      console.error(e);
      toast.error("Capture failed (iframe)");
    }
  };

  const updateProjectWithScreenshot = async (base64Url: string) => {
    const result = await axios.put("/api/project", {
      screenShot: base64Url,
      projectId: projectDetail?.projectId,
      theme: projectDetail?.theme,
      projectName: projectDetail?.projectName,
    });
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
                  iframeReference={(ifr: any) =>
                    (iframeRefs.current[index] = ifr)
                  }
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
