import { api } from '../api/client';

export interface CartLine {
  sku: string;
  qty: number;
}

// placeOrder submits the cart when the shopper clicks "Place order". The API
// applies the discount and reserves the stock.
export async function placeOrder(customerId: string, lines: CartLine[]) {
  const { data } = await api.post('/orders', { customer_id: customerId, lines });
  return data as { id: string; status: string; total_cents: number };
}

// payOrder confirms the card charge returned by the payment widget.
export async function payOrder(orderId: string, providerRef: string): Promise<void> {
  await api.post(`/orders/${orderId}/pay`, { provider_ref: providerRef });
}

// cancelOrder is the "Cancel order" button on the order page.
export async function cancelOrder(orderId: string): Promise<void> {
  await api.post(`/orders/${orderId}/cancel`);
}
