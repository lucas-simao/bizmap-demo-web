import { api } from '../api/client';

// signUp creates the shopper's account before the first checkout.
export async function signUp(email: string, name: string): Promise<string> {
  const { data } = await api.post('/customers', { email, name });
  return data.id;
}

// loadProfile shows the loyalty tier ("gold" gets 10% off) on the account page.
export async function loadProfile(customerId: string) {
  const { data } = await api.get(`/customers/${customerId}`);
  return data as { id: string; name: string; tier: string };
}
