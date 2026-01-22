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

type FriendModalPayload =
  | { type: 'FRIEND_DELETE'; nickname: string }
  | { type: 'INVITE_SENDING'; toNickname: string }
  | { type: 'INVITE_RECEIVED'; fromNickname: string }
  | null;

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

  const [modal, setModal] = useState<FriendModalPayload>(null);
  const closeModal = () => setModal(null);

  const openInviteReceivedModal = (fromNickname: string) =>
    setModal({ type: 'INVITE_RECEIVED', fromNickname });

  const { btns: gameInviteBtns } = modalProps.gameInvite;
  const invitationCount = 1;

  const acceptInvite = () => {
    closeModal();
  };
  const rejectInvite = () => {
    closeModal();
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
        onClick={() => openInviteReceivedModal('짱구는못말려')}
      />

      <Modal
        isOpen={modal?.type === 'INVITE_RECEIVED'}
        btns={gameInviteBtns}
        buttonActions={[acceptInvite, rejectInvite]}
      >
        <Modal.Message
          message={
            modal?.type === 'INVITE_RECEIVED'
              ? `'${modal.fromNickname}'님이\n게임에 초대했어요!\n지금 바로 대전할까요?`
              : ''
          }
        />
        <Modal.Image imageSrc={invitation} />
      </Modal>
    </div>
  );
};

export default FriendModePage;
