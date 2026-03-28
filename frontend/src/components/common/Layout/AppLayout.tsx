import { Outlet } from 'react-router-dom';
import MobileLayout from 'components/common/Layout/MobileLayout';
import GlobalErrorModalHost from 'components/common/Modal/GlobalErrorModalHost';
import LoadingSpinner from 'components/common/LoadingSpinner';
import NicknameModal from 'components/common/Modal/NicknameModal';

export default function AppLayout() {
  return (
    <MobileLayout>
      <Outlet />
      <GlobalErrorModalHost />
      <NicknameModal />
      <LoadingSpinner />
    </MobileLayout>
  );
}
