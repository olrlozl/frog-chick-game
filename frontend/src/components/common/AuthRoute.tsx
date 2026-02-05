import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from 'stores/userStore';

export const AuthRoute = () => {
  const isAuthed = useUserStore((s) => s.isAuthed);

  if (!isAuthed) return <Navigate to="/" replace />;

  return <Outlet />;
};
