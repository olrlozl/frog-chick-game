import { Outlet } from 'react-router-dom';
import MobileLayout from 'components/common/Layout/MobileLayout';
import LoadingSpinner from 'components/common/LoadingSpinner';
import NicknameRequiredModal from 'components/common/Modal/NicknameRequredModal';

export default function AppLayout() {
  return (
    <MobileLayout>
      <Outlet />
      <NicknameRequiredModal />
      <LoadingSpinner />
    </MobileLayout>
  );
}
