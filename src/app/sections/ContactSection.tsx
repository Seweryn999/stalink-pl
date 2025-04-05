"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { db } from "../../../lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen from-black to-gray-900 flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white mb-12 text-center animate-pulse-slow">
          Skontaktuj się
        </h2>

        {submitted ? (
          <div className="text-center text-white text-xl font-medium animate-fade-in">
            ✓ Wiadomość wysłana! Dziękuję za kontakt.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <input
                type="text"
                name="name"
                placeholder="Twoje imię"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white p-3 rounded-md"
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
                className="w-full bg-gray-800 text-white p-3 rounded-md"
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
                className="w-full bg-gray-800 text-white p-3 rounded-md"
                required
              />
            </div>

            <div className="relative group flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`relative px-8 py-2 rounded-md font-medium text-white transition-all duration-150 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Wysyłanie..." : "Wyślij"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
