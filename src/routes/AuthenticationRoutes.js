import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import AuthLayout from './AuthLayout';
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const NotFound = Loadable(lazy(() => import('views/NotFound')));
const ForgotPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));
const Otpvarify = Loadable(lazy(() => import('views/pages/authentication/authentication3/Otpvarify')));
const ResetPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword')));

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: '/login',
          element: <AuthLogin3 />
        },
        {
          path: '/register',
          element: <AuthRegister3 />
        },
        {
          path: '/forgotPassword',
          element: <ForgotPassword3 />
        },
        {
          path: '/otpvarify',
          element: <Otpvarify />
        },
        {
          path: '/resetPassword',
          element: <ResetPassword />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ]
};

export default AuthenticationRoutes;
