import { NextResponse } from "next/server";

import { askGemini } from "@/lib/gemini";
import { SITE_CONTEXT } from "@/data/site-context";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { messages: ChatMessage[] };

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Missing messages." }, { status: 400 });
  }

  const aiReply = await askGemini(messages, SITE_CONTEXT);

  return NextResponse.json({
    message:
      aiReply ??
      "Przepraszam, chwilowo nie mogę odpowiedzieć. Napisz na seweryn.stalinger@stalink.pl lub zadzwoń +48 531 087 939.",
  });
}
