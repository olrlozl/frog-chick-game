import { Outlet } from 'react-router-dom';
import MobileLayout from 'components/common/Layout/MobileLayout';
import GlobalErrorModalHost from 'components/common/Modal/GlobalErrorModalHost';
import LoadingSpinner from 'components/common/LoadingSpinner';
import NicknameRequiredModal from 'components/common/Modal/NicknameRequredModal';

export default function AppLayout() {
  return (
    <MobileLayout>
      <Outlet />
      <GlobalErrorModalHost />
      <NicknameRequiredModal />
      <LoadingSpinner />
    </MobileLayout>
  );
}
