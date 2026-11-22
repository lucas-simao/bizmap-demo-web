import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { api } from '../api/client';

export interface TimelineEntry {
  orderId: string;
  type: string;
  status?: string;
  source: string;
}

// watchTimeline streams the order's events (written by the API) to the
// order page, so status changes appear without a reload.
export function watchTimeline(orderId: string, render: (rows: TimelineEntry[]) => void) {
  const q = query(collection(db, 'order_events'), where('orderId', '==', orderId), orderBy('createdAt'));
  return onSnapshot(q, (snap) => render(snap.docs.map((d) => d.data() as TimelineEntry)));
}

// addCustomerNote lets the shopper leave a note ("leave at the door") on the
// same timeline the API writes to.
export async function addCustomerNote(orderId: string, note: string): Promise<void> {
  await addDoc(collection(db, 'order_events'), {
    orderId,
    type: 'customer_note',
    note,
    source: 'web',
    createdAt: serverTimestamp(),
  });
}

// loadOrder shows the order header above the timeline.
export async function loadOrder(orderId: string) {
  const { data } = await api.get(`/orders/${orderId}`);
  return data as { id: string; status: string; total_cents: number };
}

// loadShipment shows the carrier and tracking link once the order shipped.
export async function loadShipment(orderId: string) {
  const { data } = await api.get(`/orders/${orderId}/shipment`);
  return data as { carrier: string; tracking_code: string };
}
