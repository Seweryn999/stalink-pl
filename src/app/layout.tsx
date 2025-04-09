import "./globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: {
    default: "Stalink",
    template: "%s | STALINK",
  },
  description:
    "Tworzymy nowoczesne strony internetowe i aplikacje webowe oparte o Next.js, React, TypeScript i Tailwind CSS. Szybkość, estetyka i skuteczność sprzedażowa.",
  keywords: [
    "Next.js",
    "Frontend Developer",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Strony internetowe",
    "Web Developer",
    "Stalink",
  ],
  metadataBase: new URL("https://stalink.pl"),
  openGraph: {
    title: "Stalink",
    description:
      "Zobacz, jak nowoczesna technologia i estetyczny design mogą zwiększyć sprzedaż Twojej firmy.",
    url: "https://stalink.pl",
    siteName: "STALINK",
    images: [
      {
        url: "/images/heroimg.png",
        width: 1200,
        height: 630,
        alt: "Stalink",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stalink",
    description:
      "Tworzymy nowoczesne i zoptymalizowane strony www, które przyciągają klientów.",
    images: ["/images/heroimg.png"],
  },
  icons: {
    icon: "/logo.svg",
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <meta
          name="google-site-verification"
          content={process.env.GOOGLE_SITE_VERIFICATION}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
            `,
          }}
        />
      </head>
      <body className="w-full relative text-gray-800 overflow-x-hidden min-h-screen bg-gradient-to-br from-[#e1effb] via-[#d0e7f9] to-[#f0f7ff]">
        <Analytics />
        <Toaster />
        <div className="relative z-10 w-full">{children}</div>
      </body>
    </html>
  );
}
