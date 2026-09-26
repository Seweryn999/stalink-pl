import { Resend } from "resend";

const MAX_HEADER_CHARS = 200;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Naglowki maila nie moga zawierac CR/LF - inaczej mozna dopisac wlasne
 * naglowki (header injection) i np. dorzucic ukrytego odbiorce.
 */
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, MAX_HEADER_CHARS);
}

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactNotification({
  name,
  email,
  message,
}: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  const missing = [
    ["RESEND_API_KEY", apiKey],
    ["CONTACT_TO_EMAIL", to],
    ["CONTACT_FROM_EMAIL", from],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(`Brak zmiennych srodowiskowych: ${missing.join(", ")}`);
  }

  const safeName = sanitizeHeaderValue(name);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: from!,
    to: [to!],
    // Adres z formularza jest zwalidowany i pozbawiony CR/LF, wiec mozna
    // bezpiecznie odpowiadac wprost na wiadomosc.
    replyTo: sanitizeHeaderValue(email),
    subject: `Nowa wiadomosc ze strony: ${safeName}`,
    text: `Od: ${name} <${email}>\n\n${message}`,
    html:
      `<p><strong>Od:</strong> ${escapeHtml(name)} ` +
      `(${escapeHtml(email)})</p>` +
      `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  });

  if (error) {
    // Komunikat Resend bez tresci wiadomosci uzytkownika.
    throw new Error(`Resend: ${error.name ?? "nieznany blad wysylki"}`);
  }
}
