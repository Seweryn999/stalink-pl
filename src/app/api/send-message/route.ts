import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import { getFirestore } from "firebase-admin/firestore";

// Sprawdzenie zmiennych środowiskowych
if (!process.env.FIREBASE_PROJECT_ID) {
  throw new Error("Brak zmiennej środowiskowej FIREBASE_PROJECT_ID");
}
if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("Brak zmiennej środowiskowej FIREBASE_PRIVATE_KEY");
}
if (!process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error("Brak zmiennej środowiskowej FIREBASE_CLIENT_EMAIL");
}

// Inicjalizacja Firebase Admin SDK (tylko raz)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json(); // <--- dodaj to!

    const { name, email, message, fcmToken } = body;

    // Walidacja danych
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Imię jest wymagane i musi mieć co najmniej 2 znaki" },
        { status: 400 }
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Podaj poprawny adres email" },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Wiadomość jest wymagana i musi mieć co najmniej 5 znaków" },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const docRef = await db.collection("messages").add({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date(),
    });

    if (fcmToken) {
      const notification = {
        notification: {
          title: "Nowa wiadomość!",
          body: `Od: ${name} (${email}) - ${message.substring(0, 50)}...`,
        },
        token: fcmToken,
      };

      await getMessaging().send(notification);
    }

    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (error: any) {
    console.error("Błąd podczas zapisu lub wysyłania powiadomienia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
