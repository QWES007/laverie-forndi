
// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Configuration Firebase - À remplacer par vos propres clés
// Vous pouvez obtenir ces valeurs depuis votre console Firebase (https://console.firebase.google.com/)
const firebaseConfig = {
  apiKey: "AIzaSyC1iKr_Y2pRGkuI-Z-ZlGOhqBvKnFHzB5c", // Clé factice - à remplacer par votre clé réelle
  authDomain: "laverie-moderne-forndi.firebaseapp.com", // À remplacer
  projectId: "laverie-moderne-forndi", // À remplacer
  storageBucket: "laverie-moderne-forndi.appspot.com", // À remplacer
  messagingSenderId: "123456789012", // À remplacer
  appId: "1:123456789012:web:abcdef1234567890abcdef", // À remplacer
  databaseURL: "https://laverie-moderne-forndi-default-rtdb.europe-west1.firebasedatabase.app" // À remplacer
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);

export default app;
