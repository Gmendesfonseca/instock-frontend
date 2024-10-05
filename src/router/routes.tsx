import { routePermissions } from '@/utils/permissions';
import { RouteObject } from 'react-router-dom';
import Login from '@/header-app/pages/login/Login';
import Register from '@/header-app/pages/register/Register';
import Home from '@/pages/home/Home';
import Dashboard from '@/pages/dashboard/Dashboard';

export type RouteType = {
  path: string;
  element?: JSX.Element;
  options?: Omit<RouteObject, 'path' | 'element' | 'children'>;
  permissions?: string[] | (string | string[])[];
  children?: RouteType[];
};

export function createRoutes() {
  const routes: RouteType[] = [
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      permissions: routePermissions.COMPANY_ACCESS,
    },
    {
      path: '/404',
      element: <div>404</div>,
    },
  ];

  return routes;
}
