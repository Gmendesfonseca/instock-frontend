import api from '../api';
import { Tag } from './types';

export async function getTagsByCompany(company_id: string): Promise<Tag[]> {
  const response = await api.get(`/tags/companies/${company_id}`);
  return response.data;
}

export async function getTagByProduct(product_id: string): Promise<Tag> {
  const response = await api.get(`/tags/products/${product_id}`);
  return response.data;
}

export async function createTag(tag: Tag): Promise<Tag> {
  const response = await api.post('/tags', tag);
  return response.data;
}

export async function updateTag(tag: Tag): Promise<Tag> {
  const response = await api.put(`/tags/${tag.rfid}`, tag);
  return response.data;
}

export async function deleteTag(rfid: string): Promise<void> {
  await api.delete(`/tags/${rfid}`);
}
