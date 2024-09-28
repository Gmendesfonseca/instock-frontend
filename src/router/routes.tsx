import { lazy } from 'react';
// import { IUser } from '../interfaces/User';
// import { routePermissions } from '../utils/permissions';
import { RouteObject } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';

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
      path: '/404',
      element: <div>404</div>,
    },
  ];

  return routes;
}
