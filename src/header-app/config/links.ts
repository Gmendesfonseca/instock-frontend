export type Modulelinks = {
  api: string;
  web: string;
  secret_key: string;
  env: string;
};

export const links: Modulelinks = {
  api: import.meta.env.VITE_APP_API_URL,
  web: import.meta.env.VITE_APP_WEB_URL,
  secret_key: import.meta.env.VITE_APP_JWT_SECRET,
  env: import.meta.env.MODE,
};
