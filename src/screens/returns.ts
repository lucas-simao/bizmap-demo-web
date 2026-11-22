import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { api } from '../api/client';

// requestReturn is the "Return items" screen: it checks the order can be
// returned, then adds a return request to the shared order timeline, where
// the API's support tools and the notification function pick it up.
export async function requestReturn(orderId: string, skus: string[], reason: string): Promise<void> {
  const { data: order } = await api.get(`/orders/${orderId}`);
  if (order.status !== 'shipped') {
    throw new Error('Only shipped orders can be returned');
  }
  await addDoc(collection(db, 'order_events'), {
    orderId,
    type: 'return_requested',
    skus,
    reason,
    source: 'web',
    createdAt: serverTimestamp(),
  });
}
