import FriendSearchSection from 'components/user/FriendSearchSection';
import FriendListSection from 'components/user/FriendListSection';
import Header from 'components/common/Layout/Header';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import NotificationButton from 'components/user/NotificationButton';
import Modal from 'components/common/Modal/Modal';
import { modalProps } from 'constants/modal';
import invitation from 'assets/images/invitation.png';

const FriendModePage = () => {
  const queryClient = useQueryClient();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);

  const handleRefresh = () => {
    setIsSearchActive(false);
    setRefreshTick((prev) => prev + 1);
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.friend],
      exact: true,
    });
  };

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { btns: gameInviteBtns } = modalProps.gameInvite;
  const invitationCount = 0;
  const fromUserNickname = '짱구는못말려';
  const gameInviteMessage = `${fromUserNickname}님이\n게임에 초대했어요!\n지금 바로 대전할까요?`;

  const accept = () => {
    setIsInviteModalOpen(false);
  };

  const reject = () => {
    setIsInviteModalOpen(false);
  };

  return (
    <div className="friend-mode-page">
      <Header title="친구 대전" showRefresh onRefresh={handleRefresh} />
      <div className="page-content">
        <FriendSearchSection
          onChangeIsSearchActive={setIsSearchActive}
          refreshTick={refreshTick}
        />
        <FriendListSection hidden={isSearchActive} />
      </div>
      <NotificationButton
        unreadCount={invitationCount}
        onClick={() => setIsInviteModalOpen(true)}
      />
      <Modal
        isOpen={isInviteModalOpen}
        btns={gameInviteBtns}
        buttonActions={[accept, reject]}
      >
        <Modal.Message message={gameInviteMessage} />
        <Modal.Image imageSrc={invitation} />
      </Modal>
    </div>
  );
};

export default FriendModePage;
