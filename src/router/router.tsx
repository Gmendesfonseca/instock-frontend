import { FC } from 'react';
import { createRoutes } from './routes';
// import { Settings } from 'luxon';
import { useAuth } from '@/hooks/useAuth';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { createInterceptor } from '@/utils/interceptor';
import api from '@/services/api';

export const RenderRoutes: FC = () => {
  const { signOut, refreshToken } = useAuth();
  const routes = createRoutes();
  const { interceptRequest, interceptResponse } = createInterceptor(api, {
    signOut,
    refreshToken,
    // companyId,
  });

  interceptRequest();
  interceptResponse();

  // Settings.defaultLocale = user.config.default_language;
  // Settings.defaultZone = user.config.default_timezone;

  return (
    <RouterProvider
      router={createBrowserRouter(routes)}
      fallbackElement={<Navigate to='/404' replace />}
    />
  );
};
