import { db } from "@/config/db";
import { openrouter } from "@/config/openrouter";
import { ScreenConfigTable } from "@/config/schema";
import { GENERATE_SCREEN_PROMPT } from "@/data/Prompt";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectId, screenId, oldCode, userInput } = await req.json();
  const USER_INPUT = `${oldCode} Make changes in this code as per user input, keeping design and style same. Do not change it. Just make user requested changes. User input is: ${userInput}`;

  try {
    const aiResult = await openrouter.chat.send({
      model: process.env.OPENROUTER_API_MODEL,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: USER_INPUT,
            },
          ],
        },
      ],
      stream: false,
    });

    const code = aiResult?.choices[0].message.content;

    const updateResult = await db
      .update(ScreenConfigTable)
      .set({ code: code as string })
      .where(
        and(
          eq(ScreenConfigTable.projectId, projectId),
          eq(ScreenConfigTable.screenId, screenId),
        ),
      )
      .returning();
    return NextResponse.json(updateResult[0]);
  } catch (error) {
    return NextResponse.json({ msg: "error " });
  }
}
