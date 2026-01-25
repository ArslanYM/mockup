import { SettingContext } from "@/context/SettingContext";
import { THEMES, themeToCssVars } from "@/data/Themes";
import { ProjectType, ScreenConfigType } from "@/type/types";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Rnd } from "react-rnd";
import ScreenHandler from "./ScreenHandler";
import { HtmlWrapper } from "@/data/constant";

type Props = {
  x: number;
  y: number;
  setPanningEnabled: (enabled: boolean) => void;
  width: number;
  height: number;
  htmlCode: string | undefined;
  projectDetail: ProjectType | undefined;
  screen: ScreenConfigType | undefined;
  iframeReference: any;
};
const ScreenFrame = ({
  x,
  y,
  setPanningEnabled,
  width,
  height,
  htmlCode,
  projectDetail,
  screen,
  iframeReference,
}: Props) => {
  const { settingDetail, setSettingDetail } = useContext(SettingContext);
  const [size, setSize] = useState({ width, height });
  // const iframeReference = useRef<HTMLIFrameElement | null>(null);
  const theme = THEMES[settingDetail?.theme ?? projectDetail?.theme ?? ""];

  const html = HtmlWrapper(theme, htmlCode as string);
  const measureIframeHeight = useCallback(() => {
    const iframe = iframeReference.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const headerH = 40; // drag bar height
      const htmlEl = doc.documentElement;
      const body = doc.body;

      // ✅ choose the largest plausible height
      const contentH = Math.max(
        htmlEl?.scrollHeight ?? 0,
        body?.scrollHeight ?? 0,
        htmlEl?.offsetHeight ?? 0,
        body?.offsetHeight ?? 0,
      );

      // optional min/max clamps
      const next = Math.min(Math.max(contentH + headerH, 160), 2000);

      setSize((s) =>
        Math.abs(s.height - next) > 2 ? { ...s, height: next } : s,
      );
    } catch {
      // if sandbox/origin blocks access, we can't measure
    }
  }, []);

  useEffect(() => {
    setSize({ width, height });
  }, [width, height]);

  useEffect(() => {
    const iframe = iframeReference.current;
    if (!iframe) return;

    const onLoad = () => {
      measureIframeHeight();

      // ✅ observe DOM changes inside iframe
      const doc = iframe.contentDocument;
      if (!doc) return;

      const observer = new MutationObserver(() => measureIframeHeight());
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      // ✅ re-check a few times for fonts/images/tailwind async layout
      const t1 = window.setTimeout(measureIframeHeight, 50);
      const t2 = window.setTimeout(measureIframeHeight, 200);
      const t3 = window.setTimeout(measureIframeHeight, 600);

      return () => {
        observer.disconnect();
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.clearTimeout(t3);
      };
    };

    iframe.addEventListener("load", onLoad);
    window.addEventListener("resize", measureIframeHeight);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", measureIframeHeight);
    };
  }, [measureIframeHeight, htmlCode]);

  return (
    <Rnd
      default={{
        x: x,
        y: y,
        width: width,
        height: height,
      }}
      size={size}
      dragHandleClassName="drag-handle"
      enableResizing={{
        bottomRight: true,
        bottomLeft: true,
      }}
      onDragStart={() => setPanningEnabled(false)}
      onDragStop={() => setPanningEnabled(true)}
      onResizeStart={() => setPanningEnabled(false)}
      onResizeStop={(_, __, ref, ___, position) => {
        setPanningEnabled(true);
        setSize({
          width: ref.offsetHeight,
          height: ref.offsetHeight,
        });
      }}
    >
      {" "}
      <div className="drag-handle flex gap-2 cursor-move p-2 bg-primary text-secondary mb-2">
        <ScreenHandler
          screen={screen}
          theme={theme}
          iframeRef={iframeReference}
          projectId={projectDetail?.projectId}
        />
      </div>
      <iframe
        ref={iframeReference}
        className="w-full h-[calc(100%-40px)]"
        sandbox="allow-same-origin allow-scripts  "
        srcDoc={html}
      />
    </Rnd>
  );
};

export default ScreenFrame;
