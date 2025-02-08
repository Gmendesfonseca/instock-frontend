import { lazy } from 'react';
import { routePermissions } from '@/utils/permissions';
import { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Home = lazy(() => import('@/pages/Home'));
const Items = lazy(() => import('@/pages/Items'));
const Projects = lazy(() => import('@/pages/Projects'));
const ItemRegister = lazy(() => import('@/pages/ItemRegister'));

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
      permissions:
        routePermissions.COMPANY_ACCESS || routePermissions.PERSON_ACCESS,
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
      path: '/items',
      element: <Items />,
      permissions: routePermissions.COMPANY_ACCESS,
    },
    {
      path: '/item_register',
      element: <ItemRegister />,
      permissions: routePermissions.COMPANY_ACCESS,
    },
    {
      path: '/sales',
      element: <h1>Vendas</h1>,
      permissions: routePermissions.COMPANY_ACCESS,
    },
    {
      path: '/projects',
      element: <Projects />,
      permissions: routePermissions.COMPANY_ACCESS,
    },
    {
      path: '/settings',
      element: <h1>Configurações</h1>,
      permissions: routePermissions.COMPANY_ACCESS,
    },
    {
      path: '/404',
      element: <div>404</div>,
    },
  ];

  return routes;
}
