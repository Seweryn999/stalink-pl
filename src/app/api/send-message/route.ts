import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { getMessaging } from "firebase-admin/messaging";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, fcmToken } = body;

    if (!name || name.trim().length < 2) {
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

    if (!message || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Wiadomość jest wymagana i musi mieć co najmniej 5 znaków" },
        { status: 400 }
      );
    }

    const docRef = await adminDb.collection("messages").add({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date(),
    });

    if (fcmToken) {
      await getMessaging().send({
        notification: {
          title: "Nowa wiadomość!",
          body: `Od: ${name} (${email}) — ${message.slice(0, 60)}...`,
        },
        token: fcmToken,
      });
    }

    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Błąd podczas zapisu lub wysyłania powiadomienia:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera. Spróbuj ponownie później." },
      { status: 500 }
    );
  }
}
