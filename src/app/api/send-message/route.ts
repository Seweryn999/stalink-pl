import { NextResponse } from "next/server";

import { getAdminDb } from "@/lib/firebaseAdmin";
import { sendContactNotification } from "@/lib/email";
import {
  getClientIp,
  isAllowedOrigin,
  rateLimit,
  readJsonBody,
} from "@/lib/api-guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const MAX_NAME_CHARS = 100;
const MAX_EMAIL_CHARS = 254;
const MAX_MESSAGE_CHARS = 5_000;

const RATE_LIMIT_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;

// Bez CR/LF - adres trafia do naglowka Reply-To.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { allowed, retryAfterSeconds } = rateLimit(
    `contact:${getClientIp(request)}`,
    RATE_LIMIT_REQUESTS,
    RATE_LIMIT_WINDOW_MS
  );

  if (!allowed) {
    return NextResponse.json(
      { error: "Zbyt wiele wiadomości. Spróbuj ponownie za kilka minut." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  const body = await readJsonBody<{
    name?: unknown;
    email?: unknown;
    message?: unknown;
  }>(request, MAX_BODY_BYTES);

  if (!body) {
    return NextResponse.json(
      { error: "Nieprawidłowe żądanie." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > MAX_NAME_CHARS) {
    return NextResponse.json(
      { error: "Imię jest wymagane i musi mieć od 2 do 100 znaków" },
      { status: 400 }
    );
  }

  if (email.length > MAX_EMAIL_CHARS || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres email" },
      { status: 400 }
    );
  }

  if (message.length < 5 || message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json(
      { error: "Wiadomość jest wymagana i musi mieć od 5 do 5000 znaków" },
      { status: 400 }
    );
  }

  const payload = { name, email, message };

  // Archiwum i powiadomienie sa niezalezne: awaria jednego nie przerywa
  // drugiego i nie zaciemnia jego bledu w logach.
  const [archive, notification] = await Promise.allSettled([
    getAdminDb()
      .collection("messages")
      .add({ ...payload, timestamp: new Date() }),
    sendContactNotification(payload),
  ]);

  if (archive.status === "rejected") {
    console.error("❌ Zapis wiadomości w Firestore nie powiódł się:", archive.reason);
  }

  if (notification.status === "rejected") {
    console.error("❌ Wysyłka powiadomienia mailowego nie powiodła się:", notification.reason);
  }

  // Dopiero utrata obu kanalow oznacza, ze wiadomosc przepadla.
  if (archive.status === "rejected" && notification.status === "rejected") {
    return NextResponse.json(
      { error: "Wystąpił błąd serwera. Spróbuj ponownie później." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { id: archive.status === "fulfilled" ? archive.value.id : null },
    { status: 200 }
  );
}
