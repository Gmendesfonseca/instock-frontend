import axios from 'axios';
import { links } from '../header-app/config/links';

export const api = axios.create({
  baseURL: links.api,
});

export default api;
