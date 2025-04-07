import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Stalink",
  description: "Tworzymy zaawansowane technologicznie strony internetowe.",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className="w-full relative text-gray-800 overflow-x-hidden min-h-screen bg-gradient-to-br from-[#e1effb] via-[#d0e7f9] to-[#f0f7ff]">
        <Analytics />
        <div className="relative z-10 w-full">{children}</div>
      </body>
    </html>
  );
}
