importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "TWOJ_API_KEY",
  authDomain: "TWOJ_PROJECT_ID.firebaseapp.com",
  projectId: "TWOJ_PROJECT_ID",
  messagingSenderId: "TWOJ_SENDER_ID",
  appId: "TWOJ_APP_ID",
});

const messaging = firebase.messaging();
