import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from 'stores/userStore';

export const PublicRoute = () => {
  const isAuthed = useUserStore((s) => s.isAuthed);

  if (isAuthed) return <Navigate to="/main" replace />;

  return <Outlet />;
};
