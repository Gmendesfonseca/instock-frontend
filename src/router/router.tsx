import { FC } from 'react';
import { createRoutes } from './routes';
// import { Settings } from 'luxon';
// import { useAuth } from '../hooks/useAuth';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

export const RenderRoutes: FC = () => {
  // const { user } = useAuth();
  // const routes = createRoutes(user.type);
  const routes = createRoutes();

  // Settings.defaultLocale = user.config.default_language;
  // Settings.defaultZone = user.config.default_timezone;

  return (
    <RouterProvider
      router={createBrowserRouter(routes)}
      fallbackElement={<Navigate to='/404' replace />}
    />
  );
};
