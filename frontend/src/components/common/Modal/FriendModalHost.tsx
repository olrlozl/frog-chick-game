import { useEffect, useMemo, useRef } from 'react';
import Modal from 'components/common/Modal/Modal';
import { modalProps } from 'constants/modal';
import { useFriendModalStore } from 'stores/friendModalStore';
import { useFriendActions } from 'hooks/friend/useFriendActions';
import invitationImg from 'assets/images/invitation.png';
import waitingGif from 'assets/images/waiting.gif';
import readyGif from 'assets/images/ready.gif';
import { useNavigate } from 'react-router-dom';

const FriendModalHost = () => {
  const navigate = useNavigate();
  const { modal, openModal, closeModal } = useFriendModalStore();
  const { executeDeleteFriend, isDeleteFriendLoading } = useFriendActions();

  ///////////////////// DEV ONLY
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (modal?.type === 'INVITE_SENT') {
      timerRef.current = window.setTimeout(() => {
        openModal({ type: 'INVITE_READY', nickname: modal.nickname });
      }, 2000);
    }

    if (modal?.type === 'INVITE_READY') {
      timerRef.current = window.setTimeout(() => {
        closeModal();
        navigate('play');
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [modal?.type, modal?.nickname, openModal, closeModal, navigate]);
  ///////////////////// DEV ONLY

  const ui = useMemo(() => {
    if (!modal) return null;

    switch (modal.type) {
      case 'DELETE_FRIEND': {
        const onDelete = () => {
          executeDeleteFriend(
            { to: modal.nickname },
            { onSuccess: () => closeModal() }
          );
        };

        return {
          isOpen: true,
          isLoading: isDeleteFriendLoading,
          btns: modalProps.deleteFriend.btns,
          actions: [onDelete, closeModal],
          content: (
            <Modal.Message
              message={`'${modal.nickname}'님과\n친구를 끊을까요?`}
            />
          ),
        };
      }

      case 'INVITE_SENT': {
        const cancel = () => {
          closeModal();
        };

        return {
          isOpen: true,
          isLoading: false,
          btns: modalProps.inviteSent.btns,
          actions: [cancel],
          content: (
            <>
              <Modal.Message
                message={`초대장을 보냈어요!\n'${modal.nickname}'님이\n들어올 때까지\n잠시 기다려주세요.`}
              />
              <Modal.Gif src={waitingGif} alt="상대를 기다리는 중" />
            </>
          ),
        };
      }

      case 'INVITE_RECEIVED': {
        const accept = () => {
          openModal({ type: 'INVITE_READY', nickname: modal.nickname });
        };

        const reject = () => {
          closeModal();
        };

        return {
          isOpen: true,
          isLoading: false,
          btns: modalProps.inviteReceived.btns,
          actions: [accept, reject],
          content: (
            <>
              <Modal.Message
                message={`'${modal.nickname}'님이\n게임에 초대했어요!\n지금 바로 대전할까요?`}
              />
              <Modal.Image imageSrc={invitationImg} />
            </>
          ),
        };
      }

      case 'INVITE_READY': {
        const cancel = () => {
          closeModal();
        };

        return {
          isOpen: true,
          isLoading: false,
          btns: modalProps.inviteReady.btns,
          actions: [cancel],
          content: (
            <>
              <Modal.Message
                message={`'${modal.nickname}'님과의\n게임을 준비 중이에요.\n곧 시작됩니다!`}
              />
              <Modal.Gif src={readyGif} alt="게임 준비 중" />
            </>
          ),
        };
      }

      default:
        return null;
    }
  }, [
    modal,
    closeModal,
    openModal,
    executeDeleteFriend,
    isDeleteFriendLoading,
  ]);

  if (!ui?.isOpen) return null;

  return (
    <Modal
      isOpen={ui.isOpen}
      btns={ui.btns}
      buttonActions={ui.actions}
      isLoading={ui.isLoading}
    >
      {ui.content}
    </Modal>
  );
};

export default FriendModalHost;
