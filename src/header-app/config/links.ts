export type AwsUrl = {
  bucket: string;
  access_key_id: string;
  secret_access_key: string;
  region: string;
};

export type ModuleLinks = {
  api: string;
  web: string;
  notification: string;
  aws: AwsUrl;
  aws_project: AwsUrl;
  secret_key: string;
  mode: string;
};

export const links: ModuleLinks = {
  api: import.meta.env.VITE_APP_API_URL,
  web: import.meta.env.VITE_APP_WEB_URL,
  notification: import.meta.env.VITE_APP_API_URL_NOTIFICATIONS,
  aws: {
    access_key_id: import.meta.env.VITE_APP_AWS_BUCKET_INCICLE_ACCESS_KEY_ID,
    bucket: import.meta.env.VITE_APP_AWS_BUCKET_INCICLE_BUCKET_NAME,
    region: import.meta.env.VITE_APP_AWS_BUCKET_INCICLE_REGION,
    secret_access_key: import.meta.env
      .VITE_APP_AWS_BUCKET_INCICLE_SECRET_ACCESS_KEY,
  },
  aws_project: {
    access_key_id: import.meta.env.VITE_APP_AWS_BUCKET_PROJECTS_ACCESS_KEY_ID,
    bucket: import.meta.env.VITE_APP_AWS_BUCKET_BUCKET_PROJECTS_NAME,
    region: import.meta.env.VITE_APP_AWS_BUCKET_PROJECTS_REGION,
    secret_access_key: import.meta.env
      .VITE_APP_AWS_BUCKET_PROJECTS_SECRET_ACCESS_KEY,
  },
  secret_key: import.meta.env.VITE_APP_JWT_SECRET,
  mode: import.meta.env.MODE,
};
