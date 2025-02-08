import axios from 'axios';
import { links } from '@/config/links';

export const api = axios.create({
  baseURL: links.api.url,
});

export default api;
