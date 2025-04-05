import "./globals.css";
import { ReactNode } from "react";
import StarsBackground from "../components/ui/StarsBackground";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Stalink",
  description: "Tworzymy zaawansowane technologicznie strony internetowe.",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className="relative text-white overflow-x-hidden min-h-screen">
        <StarsBackground />
        <Analytics />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
