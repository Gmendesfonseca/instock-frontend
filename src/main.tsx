import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@/services/i18n';

createRoot(document.getElementById('root')!).render(
  import.meta.env.MODE?.includes('develop') ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);
