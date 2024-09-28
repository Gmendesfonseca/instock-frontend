import { lazy } from 'react';
// import { IUser } from '../interfaces/User';
// import { routePermissions } from '../utils/permissions';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));

export type RouteType = {
  path: string;
  element?: JSX.Element;
  options?: Omit<RouteObject, 'path' | 'element' | 'children'>;
  permissions?: string[] | (string | string[])[];
  children?: RouteType[];
};

// export function createRoutes(userType: IUser['type']) {
export function createRoutes() {
  const routes: RouteType[] = [
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/',
      element: <div>Login</div>,
    },
    {
      path: '/404',
      element: <div>404</div>,
    },
  ];

  return routes;
}
