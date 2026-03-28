import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from 'stores/userStore';

export const NicknameRoute = () => {
  const isAuthed = useUserStore((s) => s.isAuthed);
  const hasNickname = useUserStore((s) => !!s.user?.nickname);

  if (!isAuthed) return <Navigate to="/" replace />;
  if (!hasNickname) return <Navigate to="/main" replace />;

  return <Outlet />;
};
