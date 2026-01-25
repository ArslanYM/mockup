import { db } from "@/config/db";
import { openrouter } from "@/config/openrouter";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import {
  APP_LAYOUT_CONFIG_PROMPT,
  GENERATE_NEW_SCREEN_IN_EXISITING_PROJECT_PROJECT,
} from "@/data/Prompt";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
export async function POST(req: NextRequest) {
  const { userInput, deviceType, projectId, oldScreenDescription, theme } =
    await req.json();

  const aiResult = await openrouter.chat.send({
    model: process.env.OPENROUTER_API_MODEL,
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: oldScreenDescription
              ? GENERATE_NEW_SCREEN_IN_EXISITING_PROJECT_PROJECT.replace(
                  "{deviceType}",
                  deviceType,
                ).replace("{theme}", theme)
              : APP_LAYOUT_CONFIG_PROMPT.replace("{deviceType}", deviceType),
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: oldScreenDescription
              ? userInput + "Old Screen Description is:" + oldScreenDescription
              : userInput,
          },
        ],
      },
    ],
    stream: false,
  });
  console.log(aiResult);
  const JSONAiResult = JSON.parse(
    aiResult?.choices[0]?.message?.content as string,
  );
  if (JSONAiResult) {
    !oldScreenDescription &&
      (await db
        .update(ProjectTable)
        .set({
          projectVisualDescription: JSONAiResult.projectVisualDescription,
          projectName: JSONAiResult.projectName,
          theme: JSONAiResult.theme,
        })
        .where(eq(ProjectTable.projectId, projectId as string)));

    JSONAiResult.screens?.forEach(async (screen: any) => {
      const result = await db.insert(ScreenConfigTable).values({
        projectId: projectId,
        purpose: screen.purpose,
        screenDescription: screen.layoutDescription,
        screenId: screen.id,
        screenName: screen.name,
      });
    });
    return NextResponse.json(JSONAiResult);
  } else {
    return NextResponse.json({ msg: "Internal Server Error" });
  }
}

export async function DELETE(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId");
  const screenId = req.nextUrl.searchParams.get("screenId");

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ msg: "Unauthorized" });
  }
  const result = await db
    .delete(ScreenConfigTable)
    .where(
      and(
        eq(ScreenConfigTable.screenId, screenId as string),
        eq(ScreenConfigTable.projectId, projectId as string),
      ),
    );

  return NextResponse.json({ msg: "Deleted" });
}
