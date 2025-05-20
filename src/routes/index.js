import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Form from './Form';

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes, Form]);
}
