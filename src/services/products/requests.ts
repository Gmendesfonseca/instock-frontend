import api from '../api';
import { Product } from './types';

export async function getProducts(company_id: string): Promise<Product[]> {
  const response = await api.get(`/products/companies/${company_id}`);
  return response.data;
}

export async function getProduct(id: string): Promise<Product> {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function createProduct(product: Product): Promise<void> {
  const response = await api.post('/products', product);
  return response.data;
}

export async function updateProduct(product: Product): Promise<void> {
  const response = await api.put(`/products/${product.id}`, product);
  return response.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/products/${id}`);
}
