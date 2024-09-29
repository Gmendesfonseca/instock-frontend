export type Modulelinks = {
  api: string;
  web: string;
  production: boolean;
  secret_key: string;
  env: string;
};

export const links: Modulelinks = {
  api: import.meta.env.VITE_API_URL,
  web: import.meta.env.VITE_APP_PRODUCTION,
  production: import.meta.env.VITE_APP_PRODUCTION!,
  secret_key: import.meta.env.JWT_SECRET!,
  env: import.meta.env.MODE,
};
