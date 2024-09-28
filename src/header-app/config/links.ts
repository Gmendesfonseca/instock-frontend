export type Modulelinks = {
  api: string;
  web: string;
  production: boolean;
  secret_key: string;
};

export const links: Modulelinks = {
  api: import.meta.env.REACT_APP_API_URL!,
  web: import.meta.env.REACT_APP_WEB_URL!,
  production: import.meta.env.REACT_APP_PRODUCTION!,
  secret_key: import.meta.env.REACT_APP_SECRET_KEY!,
};
