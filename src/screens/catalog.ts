import { api } from '../api/client';

export interface Product {
  sku: string;
  name: string;
  price_cents: number;
  available: number;
}

// loadCatalog fills the product grid; sold-out items are greyed out.
export async function loadCatalog(): Promise<Product[]> {
  const { data } = await api.get('/products');
  return data;
}
