// src/app/page.tsx

import HomeClient from "./HomeClient";

export const metadata = {
  title: "Stalink",
  description:
    "Nowoczesne, estetyczne i szybkie strony internetowe budowane z wykorzystaniem Next.js, React, TypeScript i Tailwind CSS.",
};

export default function Page() {
  return <HomeClient />;
}
