import { initializeApp, getApps } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  Messaging,
} from "firebase/messaging";

let messaging: Messaging | null = null;

export const initFirebase = () => {
  if (typeof window === "undefined") return;

  if (!getApps().length) {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
    };

    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
    console.log("✅ Firebase client initialized");
  }
};

export const requestForToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null;

  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("❌ Brak zgody na powiadomienia push");
      return null;
    }

    if (!messaging) {
      throw new Error("❌ Firebase Messaging nie jest zainicjalizowane");
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
    });

    if (token) {
      console.log("✅ Token FCM:", token);
      return token;
    }
  } catch (err) {
    console.error("Błąd pobierania tokena:", err);
  }

  return null;
};

export const onMessageListener = (): Promise<any> =>
  new Promise((resolve) => {
    if (typeof window !== "undefined" && messaging) {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    }
  });
