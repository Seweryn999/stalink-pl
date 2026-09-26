const GEMINI_MODEL = "gemini-3.8-flash";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `Jesteś wirtualnym asystentem firmy STALINK, która tworzy nowoczesne strony internetowe i automatyzacje AI.
Odpowiadaj w języku, w którym pisze użytkownik. Bądź zwięzły, konkretny i pomocny.
Korzystaj z poniższych informacji o firmie, gdy są odpowiednie, oraz ze swojej ogólnej wiedzy o tworzeniu stron internetowych i automatyzacji AI.
Jeśli nie znasz odpowiedzi na pytanie dotyczące konkretnej oferty lub wyceny, zaproponuj kontakt: e-mail seweryn.stalinger@stalink.pl, telefon +48 531 087 939, lub formularz na stronie /kontakt.

Informacje o firmie:
`;

const REQUEST_TIMEOUT_MS = 20_000;
const MAX_OUTPUT_TOKENS = 600;

export async function askGemini(
  history: ChatMessage[],
  context: string,
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Brak GEMINI_API_KEY w zmiennych srodowiskowych");
    return null;
  }

  const contents = history.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          // Klucz w naglowku, nie w URL - nie wycieka do logow ani do Referera.
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: `${SYSTEM_PROMPT}${context}` }],
          },
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: MAX_OUTPUT_TOKENS,
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        }),
      },
    );

    if (!res.ok) {
      // Logujemy sam status - tresc bledu Google potrafi zawierac fragmenty zadania.
      console.error(`Gemini API zwrocilo status ${res.status}`);
      return null;
    }

    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text?.trim() ?? null;
  } catch (error) {
    const reason =
      error instanceof Error && error.name === "AbortError"
        ? "timeout"
        : "blad polaczenia";
    console.error(`Gemini API: ${reason}`);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
