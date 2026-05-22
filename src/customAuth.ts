/**
 * Firebase Auth via REST API — sin módulos nativos
 * Funciona en Expo Go, emuladores y producción
 */

const API_KEY = "AIzaSyB_lHSk7tsVKKp4h4bRK8-OJJMC63ZOoak";
const BASE    = "https://identitytoolkit.googleapis.com/v1/accounts";

// Objeto auth mutable — simula FirebaseAuth
export const auth = {
  currentUser: null as { email: string; uid: string } | null,
};

// Mapeo de códigos de error de Firebase REST → mensajes amigables
function mapError(code: string): string {
  const map: Record<string, string> = {
    'EMAIL_NOT_FOUND':      'auth/user-not-found',
    'INVALID_PASSWORD':     'auth/wrong-password',
    'EMAIL_EXISTS':         'auth/email-already-in-use',
    'WEAK_PASSWORD':        'auth/weak-password',
    'INVALID_EMAIL':        'auth/invalid-email',
    'USER_DISABLED':        'auth/user-disabled',
    'TOO_MANY_ATTEMPTS_TRY_LATER': 'auth/too-many-requests',
  };
  return map[code] ?? code;
}

async function firebasePost(endpoint: string, body: object) {
  const res = await fetch(`${BASE}:${endpoint}?key=${API_KEY}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) {
    const code = mapError(data.error.message ?? 'UNKNOWN');
    throw { code, message: data.error.message };
  }
  return data;
}

export async function signInWithEmailAndPassword(
  _auth: typeof auth, email: string, password: string
) {
  const data = await firebasePost('signInWithPassword', {
    email, password, returnSecureToken: true,
  });
  auth.currentUser = { email: data.email, uid: data.localId };
  return { user: auth.currentUser };
}

export async function createUserWithEmailAndPassword(
  _auth: typeof auth, email: string, password: string
) {
  const data = await firebasePost('signUp', {
    email, password, returnSecureToken: true,
  });
  auth.currentUser = { email: data.email, uid: data.localId };
  return { user: auth.currentUser };
}

export async function sendPasswordResetEmail(
  _auth: typeof auth, email: string
) {
  await firebasePost('sendOobCode', {
    requestType: 'PASSWORD_RESET', email,
  });
}

export async function signOut(_auth: typeof auth) {
  auth.currentUser = null;
}

export function onAuthStateChanged(
  _auth: typeof auth,
  callback: (user: typeof auth.currentUser) => void
): () => void {
  // Llamar inmediatamente con el estado actual
  callback(auth.currentUser);
  return () => {}; // unsubscribe no-op
}
