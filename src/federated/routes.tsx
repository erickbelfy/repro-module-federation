import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { FederatedLoginPage, FederatedResetPasswordPage } from '../pages';

export const loginRoutes = [
  {
    path: 'login',
    element: <FederatedLoginPage />,
  },
  { path: 'reset-password', element: <FederatedResetPasswordPage /> },
] as RouteObject[];
