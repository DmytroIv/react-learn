import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '@/client/hooks/useAuthStatus';
import { Spinner } from '@/client/components';

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
