import "./globals.css";
import { ReactNode } from "react";
import StarsBackground from "../components/ui/StarsBackground";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Stalink",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="relative text-white overflow-x-hidden min-h-screen starry-background">
        <StarsBackground />
        <Analytics />
        <StarsBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
