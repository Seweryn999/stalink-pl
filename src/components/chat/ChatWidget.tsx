"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const GREETING =
  "Cześć! Jestem asystentem AI firmy STALINK. Zapytaj mnie o strony internetowe, automatyzację AI, projekty lub wycenę.";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  async function sendMessage() {
    const content = input.trim();
    if (!content || isLoading) return;

    const nextMessages = [...messages, { role: "user", content } as const];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = (await res.json()) as { message: string };
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Przepraszam, coś poszło nie tak. Napisz na seweryn.stalinger@stalink.pl lub zadzwoń +48 531 087 939.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={
        isOpen
          ? "fixed inset-0 z-[1000] sm:inset-auto sm:bottom-6 sm:right-6"
          : "fixed bottom-6 right-6 z-[1000]"
      }
    >
      {isOpen && (
        <div
          className="flex h-[100dvh] w-full flex-col overflow-hidden border border-cyan-400/15 bg-[#070a17] shadow-2xl shadow-black/60 sm:mb-4 sm:h-[480px] sm:w-[380px] sm:rounded-3xl"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div
            className="flex items-center justify-between border-b border-cyan-400/15 bg-white/[0.03] px-5 py-4"
            style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)" }}
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-white">
              Asystent <span className="text-cyan-400">STALINK</span>
            </p>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Zamknij czat"
              className="flex h-9 w-9 items-center justify-center text-slate-400 transition hover:text-white"
            >
              <X size={22} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-[15px] leading-6 sm:max-w-[85%] sm:text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-cyan-500 text-[#05060f]"
                    : "bg-white/[0.06] text-slate-200"
                }`}
              >
                {message.content}
              </div>
            ))}

            {isLoading && (
              <div className="max-w-[88%] rounded-2xl bg-white/[0.06] px-4 py-3 text-[15px] text-slate-400 sm:max-w-[85%] sm:text-sm">
                Piszę odpowiedź...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-cyan-400/15 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Napisz wiadomość..."
              className="flex-1 rounded-full border border-cyan-400/15 bg-black/40 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 sm:text-sm"
            />

            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Wyślij"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-[#05060f] transition hover:bg-cyan-400 disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Otwórz czat"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-[#05060f] shadow-[0_0_25px_rgba(34,211,238,0.5)] transition hover:bg-cyan-400"
        >
          <MessageCircle size={26} />
        </button>
      )}
    </div>
  );
}
