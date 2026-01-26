import FriendSearchSection from 'components/user/FriendSearchSection';
import FriendListSection from 'components/user/FriendListSection';
import Header from 'components/common/Layout/Header';
import NotificationButton from 'components/user/NotificationButton';
import Modal from 'components/common/Modal/Modal';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import { modalProps } from 'constants/modal';
import { useFriendActions } from 'hooks/friend/useFriendActions';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import invitationImg from 'assets/images/invitation.png';
import waitingGif from 'assets/images/waiting.gif';
import readyGif from 'assets/images/ready.gif';

type FriendModalPayload =
  | { type: 'DELETE_FRIEND'; nickname: string }
  | { type: 'INVITE_SENDING'; nickname: string }
  | { type: 'INVITE_READY'; nickname: string }
  | { type: 'INVITE_RECEIVED'; nickname: string }
  | null;

const FriendModePage = () => {
  const queryClient = useQueryClient();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);
  const navigate = useNavigate();

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

  const openInviteSendingModal = (nickname: string) =>
    setModal({ type: 'INVITE_SENDING', nickname });

  const markInviteReady = (nickname: string) =>
    setModal({ type: 'INVITE_READY', nickname });

  const openInviteReceivedModal = (nickname: string) =>
    setModal({ type: 'INVITE_RECEIVED', nickname });

  const { executeDeleteFriend, isDeleteFriendLoading } = useFriendActions();
  const { btns: friendDeleteBtns } = modalProps.deleteFriend;
  const { btns: inviteReceivedBtns } = modalProps.inviteReceived;
  const invitationCount = 1;

  const deleteFriend = () => {
    if (modal?.type !== 'DELETE_FRIEND') return;

    executeDeleteFriend(
      { to: modal.nickname },
      { onSuccess: () => closeModal() }
    );
  };

  const cancelInvite = () => {
    closeModal();
  };

  const startGame = () => {
    closeModal();
    navigate('play');
  };

  const acceptInvite = () => {
    closeModal();
  };
  const rejectInvite = () => {
    closeModal();
  };

  //////////// DEV ONLY
  const readyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // SENDING 들어오면 2초 뒤 READY로 전환
    if (modal?.type === 'INVITE_SENDING') {
      readyTimerRef.current = window.setTimeout(() => {
        markInviteReady(modal.nickname);
      }, 2000);
    }

    // 모달 닫거나 상태 바뀌면 타이머 정리
    return () => {
      if (readyTimerRef.current) {
        clearTimeout(readyTimerRef.current);
        readyTimerRef.current = null;
      }
    };
  }, [modal]);
  //////////// DEV ONLY

  const inviteUI =
    modal?.type === 'INVITE_SENDING'
      ? {
          btns: modalProps.inviteSending.btns,
          actions: [cancelInvite],
          message: `초대장을 보냈어요!\n'${modal.nickname}'님이\n들어올 때까지\n잠시 기다려주세요.`,
          gif: waitingGif,
          gifAlt: '상대를 기다리는 중',
        }
      : modal?.type === 'INVITE_READY'
        ? {
            btns: modalProps.inviteReady.btns,
            actions: [startGame, cancelInvite],
            message: `'${modal.nickname}'님이\n입장했습니다!\n게임을 시작할 수 있어요.`,
            gif: readyGif,
            gifAlt: '게임 시작 준비 완료',
          }
        : null;

  return (
    <div className="friend-mode-page">
      <Header title="친구 대전" showRefresh onRefresh={handleRefresh} />
      <div className="page-content">
        <FriendSearchSection
          onChangeIsSearchActive={setIsSearchActive}
          refreshTick={refreshTick}
          onInviteFriend={openInviteSendingModal}
          onDeleteFriend={openDeleteModal}
        />
        <FriendListSection
          hidden={isSearchActive}
          onInviteFriend={openInviteSendingModal}
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

      {/* 2) 초대장 보내기 모달 */}
      <Modal
        isOpen={!!inviteUI}
        btns={inviteUI?.btns ?? []}
        buttonActions={inviteUI?.actions ?? []}
      >
        <Modal.Message message={inviteUI?.message ?? ''} />
        {inviteUI?.gif && (
          <img
            src={inviteUI.gif}
            alt={inviteUI.gifAlt}
            className="invite-status-gif"
          />
        )}
      </Modal>

      {/* 3) 초대장 받기 모달 */}
      <Modal
        isOpen={modal?.type === 'INVITE_RECEIVED'}
        btns={inviteReceivedBtns}
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
        <Modal.Image imageSrc={invitationImg} />
      </Modal>
    </div>
  );
};

export default FriendModePage;
