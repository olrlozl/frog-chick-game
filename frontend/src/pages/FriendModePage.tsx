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
import { useFriendActions } from 'hooks/friend/useFriendActions';

type FriendModalPayload =
  | { type: 'DELETE_FRIEND'; nickname: string }
  | { type: 'INVITE_SENDING'; nickname: string }
  | { type: 'INVITE_RECEIVED'; nickname: string }
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

  const openDeleteModal = (nickname: string) =>
    setModal({ type: 'DELETE_FRIEND', nickname });

  const openInviteReceivedModal = (nickname: string) =>
    setModal({ type: 'INVITE_RECEIVED', nickname });

  const { executeDeleteFriend, isDeleteFriendLoading } = useFriendActions();
  const { btns: friendDeleteBtns } = modalProps.deleteFriend;
  const { btns: gameInviteBtns } = modalProps.gameInvite;
  const invitationCount = 1;

  const deleteFriend = () => {
    if (modal?.type !== 'DELETE_FRIEND') return;

    executeDeleteFriend(
      { to: modal.nickname },
      { onSuccess: () => closeModal() }
    );
  };

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
          onDeleteFriend={openDeleteModal}
        />
        <FriendListSection
          hidden={isSearchActive}
          onDeleteFriend={openDeleteModal}
        />
      </div>

      <NotificationButton
        unreadCount={invitationCount}
        onClick={() => openInviteReceivedModal('짱구는못말려')}
      />

      {/* 1) 친구 삭제 확인 모달 */}
      <Modal
        isOpen={modal?.type === 'DELETE_FRIEND'}
        btns={friendDeleteBtns}
        buttonActions={[deleteFriend, closeModal]}
        isLoading={isDeleteFriendLoading}
      >
        <Modal.Message
          message={
            modal?.type === 'DELETE_FRIEND'
              ? `'${modal.nickname}'님과\n친구를 끊을까요?`
              : ''
          }
        />
      </Modal>

      {/* 2) 초대장 보내는 중 모달 */}

      {/* 3) 받은 초대장 모달 */}
      <Modal
        isOpen={modal?.type === 'INVITE_RECEIVED'}
        btns={gameInviteBtns}
        buttonActions={[acceptInvite, rejectInvite]}
        // isLoading={}
      >
        <Modal.Message
          message={
            modal?.type === 'INVITE_RECEIVED'
              ? `'${modal.nickname}'님이\n게임에 초대했어요!\n지금 바로 대전할까요?`
              : ''
          }
        />
        <Modal.Image imageSrc={invitation} />
      </Modal>
    </div>
  );
};

export default FriendModePage;
