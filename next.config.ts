import type { NextConfig } from "next";

// Stare podstrony (sprzed przebudowy na jedną stronę) – trwałe przekierowania 301,
// żeby Google zastąpił je w wynikach wyszukiwania nową stroną główną.
const oldPages: Record<string, string> = {
  "/o-mnie": "/#o-mnie",
  "/projekty": "/#projekty",
  "/kontakt": "/#kontakt",
  "/automatyzacja-ai": "/#automatyzacja",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return Object.entries(oldPages).flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}/:path*`, destination, permanent: true },
    ]);
  },
};

export default nextConfig;
