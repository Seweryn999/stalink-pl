import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Next 16 usunal komende `next lint` - konfiguracja przeszla na flat config
// i uruchamiamy ESLint bezposrednio (patrz skrypty w package.json).
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
      "public/**",
      "git-filter-repo.py",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Ambientowe deklaracje modulow (*.glb, *.json, shimy three.js) z natury
    // opisuja nietypowane zrodla - `any` jest tu zamierzone.
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // Pliki konfiguracyjne sa modulami CommonJS.
    files: ["*.config.js", "*.config.mjs", "*.config.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
];

export default eslintConfig;
