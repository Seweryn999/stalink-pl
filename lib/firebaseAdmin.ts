import { cert, getApps, initializeApp, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

// ✅ Walidacja zmiennych środowiskowych
const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } =
  process.env;

if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL) {
  throw new Error(
    "Brakuje wymaganych zmiennych środowiskowych do Firebase Admin"
  );
}

// ✅ Inicjalizacja lub użycie istniejącej instancji
const adminApp: App =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId: FIREBASE_PROJECT_ID,
          privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          clientEmail: FIREBASE_CLIENT_EMAIL,
        }),
      })
    : getApps()[0];

// ✅ Eksport bazy danych Firestore
export const adminDb: Firestore = getFirestore(adminApp);
