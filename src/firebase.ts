import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Same Firebase project as the API, so both see the same "order_events".
const app = initializeApp({ projectId: 'demo-shop' });
export const db = getFirestore(app);
