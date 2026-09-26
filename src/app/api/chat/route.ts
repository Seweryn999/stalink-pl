import { NextResponse } from "next/server";

import { askGemini } from "@/lib/gemini";
import { SITE_CONTEXT } from "@/data/site-context";
import {
  getClientIp,
  isAllowedOrigin,
  rateLimit,
  readJsonBody,
} from "@/lib/api-guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 1_500;
const MAX_TOTAL_CHARS = 8_000;

const RATE_LIMIT_REQUESTS = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;

const CONTACT_FALLBACK =
  "Przepraszam, chwilowo nie mogę odpowiedzieć. Napisz na seweryn.stalinger@stalink.pl lub zadzwoń +48 531 087 939.";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function isValidHistory(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value)) return false;
  if (value.length === 0 || value.length > MAX_MESSAGES) return false;

  let totalChars = 0;

  for (const item of value) {
    if (typeof item !== "object" || item === null) return false;

    const { role, content } = item as Partial<ChatMessage>;

    if (role !== "user" && role !== "assistant") return false;
    if (typeof content !== "string") return false;

    const trimmed = content.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_MESSAGE_CHARS) return false;

    totalChars += trimmed.length;
    if (totalChars > MAX_TOTAL_CHARS) return false;
  }

  return true;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { allowed, retryAfterSeconds } = rateLimit(
    `chat:${getClientIp(request)}`,
    RATE_LIMIT_REQUESTS,
    RATE_LIMIT_WINDOW_MS
  );

  if (!allowed) {
    return NextResponse.json(
      {
        message:
          "Sporo pytań naraz :) Daj mi chwilę i spróbuj ponownie za minutę.",
      },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  const body = await readJsonBody<{ messages?: unknown }>(
    request,
    MAX_BODY_BYTES
  );

  if (!body || !isValidHistory(body.messages)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = body.messages.map((message) => ({
    role: message.role,
    content: message.content.trim(),
  }));

  try {
    const aiReply = await askGemini(messages, SITE_CONTEXT);

    return NextResponse.json({ message: aiReply ?? CONTACT_FALLBACK });
  } catch {
    // Szczegoly zostaja w logach serwera, klient dostaje ogolny komunikat.
    return NextResponse.json({ message: CONTACT_FALLBACK }, { status: 200 });
  }
}
