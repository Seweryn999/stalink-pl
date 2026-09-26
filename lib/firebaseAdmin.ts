import {
  cert,
  getApps,
  initializeApp,
  type App,
  type ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const APP_NAME = "stalink-admin";

function readServiceAccount(): ServiceAccount {
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  const missing = [
    ["FIREBASE_PROJECT_ID", projectId],
    ["FIREBASE_CLIENT_EMAIL", clientEmail],
    ["FIREBASE_PRIVATE_KEY", rawPrivateKey?.trim()],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    // Same nazwy zmiennych, nigdy wartosci.
    throw new Error(
      `Brak zmiennych srodowiskowych Firebase Admin: ${missing.join(", ")}`
    );
  }

  // Na Vercelu i w .env klucz trzymany jest w jednej linii, gdzie lamanie
  // linii zapisane jest jako dwa znaki: backslash i n.
  const privateKey = rawPrivateKey!.replace(/\\n/g, "\n");

  if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
    throw new Error(
      "FIREBASE_PRIVATE_KEY nie wyglada na klucz PEM - sprawdz, czy wartosc jest w cudzyslowach i zawiera naglowek BEGIN PRIVATE KEY"
    );
  }

  return { projectId, clientEmail, privateKey };
}

function getAdminApp(): App {
  // Nazwana instancja + wyszukanie w rejestrze chroni przed powtorna
  // inicjalizacja przy hot reloadzie w `next dev`.
  const existing = getApps().find((app) => app.name === APP_NAME);
  if (existing) return existing;

  return initializeApp({ credential: cert(readServiceAccount()) }, APP_NAME);
}

let cachedDb: Firestore | null = null;

/**
 * Leniwa inicjalizacja - brakujaca zmienna srodowiskowa daje czytelny blad
 * w miejscu uzycia, a nie wywala calego modulu przy imporcie.
 */
export function getAdminDb(): Firestore {
  if (!cachedDb) cachedDb = getFirestore(getAdminApp());
  return cachedDb;
}
