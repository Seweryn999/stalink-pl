const GEMINI_MODEL = "gemini-2.5-flash";

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

export async function askGemini(
  history: ChatMessage[],
  context: string,
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const contents = history.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: `${SYSTEM_PROMPT}${context}` }],
          },
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 800,
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        }),
      },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text?.trim() ?? null;
  } catch {
    return null;
  }
}
