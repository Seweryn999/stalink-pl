"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import {
  initFirebase,
  requestForToken,
  onMessageListener,
} from "@/lib/firebaseClient";

import { toast } from "sonner";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = async () => {
      initFirebase(); // najpierw inicjalizacja Firebase app
      const token = await requestForToken();
      if (token) {
        setFcmToken(token);
        console.log("Token FCM ustawiony:", token);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const unsubscribe = onMessageListener().then((payload: any) => {
      console.log("📩 Otrzymano wiadomość push:", payload);

      toast(payload.notification?.title || "Nowa wiadomość!", {
        description: payload.notification?.body || "",
      });
    });

    return () => {};
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || formData.name.trim().length < 2) {
      return "Imię jest wymagane i musi mieć co najmniej 2 znaki";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Podaj poprawny adres email";
    }
    if (!formData.message || formData.message.trim().length < 5) {
      return "Wiadomość jest wymagana i musi mieć co najmniej 5 znaków";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        fcmToken,
      };

      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Błąd podczas wysyłania wiadomości");
      }

      const result = await response.json();
      console.log("Wiadomość zapisana z ID:", result.id);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      toast("Nowa wiadomość!", {
        description: "Kliknij, by sprawdzić skrzynkę.",
        action: {
          label: "Zobacz",
          onClick: () => (window.location.href = "/panel"),
        },
      });
    } catch (error: any) {
      console.error("Błąd podczas wysyłania wiadomości:", error);
      setError(
        error.message ||
          "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-blue-200 flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 mx-auto">
        <motion.div
          className="w-full md:w-2/3"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="!mb-3 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest text-gray-800 text-center md:text-left">
            Skontaktuj się
          </h2>

          {submitted ? (
            <div className="text-center text-blue-600 text-xl font-medium animate-fade-in">
              ✓ Wiadomość wysłana! Dziękuję za kontakt.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="text-center text-red-600 text-xl font-medium">
                  {error}
                </div>
              )}
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  placeholder="Twoje imię"
                  value={formData.name}
                  onChange={handleChange}
                  className="!mb-3 !px-2 !py-2 w-full bg-blue-50 text-gray-800 p-3 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  placeholder="Twój email"
                  value={formData.email}
                  onChange={handleChange}
                  className="!mb-3 !px-2 !py-2 w-full bg-blue-50 text-gray-800 p-3 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  placeholder="Twoja wiadomość"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="!mb-3 !px-2 !py-2 w-full bg-blue-50 text-gray-800 p-3 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="relative group flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative !mt-2 !px-2 !py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_#60a5fa] border-2 border-blue-300 ${
                    loading
                      ? "bg-blue-300 cursor-not-allowed text-gray-600"
                      : "bg-white text-blue-500 hover:bg-blue-50"
                  }`}
                >
                  {loading ? "Wysyłanie..." : "Wyślij"}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col items-center md:items-start gap-6 self-center md:self-auto mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() =>
              window.open("https://github.com/Seweryn999", "_blank")
            }
            className="!px-2 !py-2 flex items-center gap-4 bg-white text-blue-500 rounded-md border-2 border-blue-300 transition-all duration-300 hover:bg-blue-50 hover:scale-105 hover:shadow-[0_0_10px_#60a5fa]"
          >
            <Github className="w-6 h-6" />
            GitHub
          </button>

          <button
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/seweryn-stalinger-2a31b2297/",
                "_blank"
              )
            }
            className="!mb-4 !px-2 !py-2 flex items-center gap-4 bg-white text-blue-500 rounded-md border-2 border-blue-300 transition-all duration-300 hover:bg-blue-50 hover:scale-105 hover:shadow-[0_0_10px_#60a5fa]"
          >
            <Linkedin className="w-6 h-6" />
            LinkedIn
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
