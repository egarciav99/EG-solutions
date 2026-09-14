import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let firestoreInstance: Firestore | null = null;

export function getDb(): Firestore {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !rawPrivateKey) {
    throw new Error(
      'Faltan variables de entorno para Firebase Admin (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).'
    );
  }

  // Vercel y entornos serverless guardan los saltos de línea escapados (\n)
  const privateKey = rawPrivateKey.replace(/\\n/g, '\n');

  let app: App;
  if (getApps().length === 0) {
    app = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } else {
    app = getApps()[0];
  }

  firestoreInstance = getFirestore(app);
  return firestoreInstance;
}
