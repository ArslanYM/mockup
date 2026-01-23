"use client";
import React, { useState } from "react";
import { Background, BackgroundBoxes } from "@/components/theme/background";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ArrowRightIcon, Loader } from "lucide-react";
import { suggestions } from "@/data/constant";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Rocket, Ship } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
const Hero = () => {
  const [userInput, setUserInput] = useState<string>();
  const [device, setDevice] = useState<string>("website");
  const [loading, setLoading] = useState(false);
  const words = [
    {
      text: "Design",
    },
    {
      text: "High",
    },
    {
      text: "Quality",
    },
    {
      text: "Website",
    },
    {
      text: "And",
    },
    {
      text: "Mobile",
    },
    {
      text: "Designs",
    },

    {
      text: "With",
    },
    {
      text: "Mockup.",
      className: "text-blue-700 dark:text-blue-500",
    },
  ];

  const router = useRouter();

  const user = useUser();

  async function onCreateProject() {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (!userInput) {
      return;
    }
    setLoading(true);
    const projectId = crypto.randomUUID();
    const result = await axios.post("/api/project", {
      projectId: projectId,
      userInput: userInput,
      device: device,
    });

    console.log(result.data);
    setLoading(false);

    router.push(`/project/${projectId}`);
  }
  return (
    <div>
      <Background />
      <div className="flex flex-col items-center justify-center gap-6 mt-20 p-10 md:px-24">
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Introducing Mockup</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
        <TypewriterEffect words={words} />
        <p className="text-center mt-2  relative">
          Imagine your idea and turn it into reality.
        </p>
        <InputGroup className="flex  max-w-xl w-full gap-6 mt-5 z-10 justify-center items-center">
          <InputGroupTextarea
            onChange={(e) => {
              setUserInput(e.target?.value);
            }}
            value={userInput}
            data-slot="input-group-control"
            className="flex field-sizing-content min-h-24 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
            placeholder="I want to create a mockup for my..."
          />
          <InputGroupAddon align="block-end">
            <Select
              defaultValue="mobile"
              onValueChange={(value) => {
                setDevice(value!);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="mobile">Mobile Application</SelectItem>
              </SelectContent>
            </Select>
            <InputGroupButton
              disabled={loading}
              className="ml-auto"
              size="sm"
              variant="outline"
              onClick={() => {
                onCreateProject();
              }}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <Rocket className="" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <div className="flex gap-5 mt-4">
          {suggestions.map((suggestion, _) => {
            return (
              <div
                className="border cursor-pointer p-2 flex flex-col items-center z-10 hover:animate-in "
                key={_}
                onClick={() => {
                  setUserInput(suggestion?.description);
                }}
              >
                <h2 className="text-lg">{suggestion?.icon}</h2>
                <h1 className="text-center line-clamp-2 text-sm">
                  {suggestion.name}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
