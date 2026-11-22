import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

initializeApp({ projectId: 'demo-shop' });
const db = getFirestore();

// notifyOnOrderEvent turns every timeline event the API writes (paid,
// shipped, cancelled, expired) into an in-app notification for the shopper.
export const notifyOnOrderEvent = onDocumentCreated('order_events/{eventId}', async (event) => {
  const data = event.data?.data();
  if (!data || data.source !== 'api') return;
  await db.collection('notifications').add({
    orderId: data.orderId,
    title: `Your order is ${data.status}`,
    read: false,
    createdAt: FieldValue.serverTimestamp(),
  });
});
