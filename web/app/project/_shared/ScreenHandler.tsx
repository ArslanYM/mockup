import {
  Code,
  Copy,
  Download,
  GripVertical,
  Loader,
  MoreVertical,
  Share,
  Sparkle,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScreenConfigType } from "@/type/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { HtmlWrapper } from "@/data/constant";
import html2canvas from "html2canvas";
import axios from "axios";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { RefreshDataContext } from "@/context/RefreshDataContext";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
type Props = {
  screen: ScreenConfigType | undefined;
  theme: any;
  iframeRef: any;
  projectId: string | undefined;
};
const ScreenHandler = ({ screen, theme, iframeRef, projectId }: Props) => {
  const htmlCode = HtmlWrapper(theme, screen?.code as string);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { refreshData, setRefreshData } = useContext(RefreshDataContext);
  const takeIframeScreenshot = async () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const body = doc.body;

      // wait one frame to ensure layout is stable
      await new Promise((res) => requestAnimationFrame(res));

      const canvas = await html2canvas(body, {
        backgroundColor: null,
        useCORS: true,
        scale: window.devicePixelRatio || 1,
      });

      const image = canvas.toDataURL("image/png");

      // download automatically
      const link = document.createElement("a");
      link.href = image;
      link.download = `${(screen?.screenName as string) || "screen"}.png`;
      link.click();
    } catch (err) {
      console.error("Screenshot failed:", err);
    }
  };

  async function deleteScreen() {
    console.log(screen);
    const result = await axios.delete(
      `/api/generate-config?projectId=${projectId}&screenId=${screen?.screenId}`,
    );
    setRefreshData({ method: "screenConfig", date: Date.now() });
    toast.success("Screen Deleted");
  }

  async function editScreen() {
    setLoading(true);
    toast.loading("Regenerating New Screen Please Wait");
    const result = await axios.post("/api/edit-screen", {
      projectId: projectId,
      screenId: screen?.screenId,
      oldCode: screen?.code,
      userInput: userInput,
    });
    console.log(result.data);

    setRefreshData({ method: "screenConfig", date: Date.now() });
    toast.success("Screen Edited Successfully");
    setLoading(false);
  }

  return (
    <>
      <div className="flex  justify-between items-center w-full text-white">
        <div className="flex items-center gap-2">
          <GripVertical className="h-6 w-6" />
          <h2 className="">{screen?.screenName}</h2>
        </div>
        <div className="">
          <Dialog>
            <DialogTrigger>
              <Button variant={"ghost"} size={"icon-sm"}>
                <Code />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-full h-[70vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>HTML + TailwindCSS Code</DialogTitle>
                <DialogDescription>
                  <div className="flex-1 overflow-y-auto border bg-muted p-4">
                    <SyntaxHighlighter
                      language="HTML"
                      style={docco}
                      wrapLongLines
                      customStyle={{
                        margin: 0,
                        padding: 0,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        overflow: "hidden",
                        height: "50vh",
                      }}
                      codeTagProps={{
                        style: {
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        },
                      }}
                    >
                      {htmlCode}
                    </SyntaxHighlighter>
                  </div>
                  <Button
                    className="mt-3"
                    onClick={() => {
                      navigator.clipboard.writeText(htmlCode as string);
                      toast.success("Code Copied!");
                    }}
                  >
                    <Copy />
                    Copy
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              takeIframeScreenshot();
            }}
          >
            <Download />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"}>
                <Sparkle />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Title</PopoverTitle>
                <PopoverDescription>
                  <div className="">
                    <Textarea
                      onChange={(e) => {
                        setUserInput(e.target.value);
                      }}
                      placeholder="Write the changes you want to make"
                    ></Textarea>
                    <Button
                      disabled={loading}
                      onClick={() => {
                        editScreen();
                      }}
                      size={"sm"}
                      className="mt-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="animate-spin" /> Generating....
                        </>
                      ) : (
                        <>
                          {" "}
                          <Sparkle /> Regenerate
                        </>
                      )}
                    </Button>
                  </div>
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"sm"}>
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                {" "}
                <Share /> Export{" "}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  deleteScreen();
                }}
              >
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default ScreenHandler;
