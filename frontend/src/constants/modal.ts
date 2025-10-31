import { ButtonColor, MessageFontSize } from 'types/common';

interface ModalProps {
  message: string;
  messageFontSize?: MessageFontSize;
  btns: { label: string; type: ButtonColor }[];
}

type ModalKeys =
  | 'logoutConfirm'
  | 'createNickname'
  | 'gameResult'
  | 'gamePause'
  | 'error';

type ModalPropsType = {
  [K in ModalKeys]: ModalProps;
};

export const modalProps: ModalPropsType = {
  logoutConfirm: {
    message: '로그아웃 하시겠습니까?',
    btns: [
      { label: '확인', type: 'deepblue' },
      { label: '취소', type: 'skyblue' },
    ],
  },
  createNickname: {
    message: '닉네임을 입력해주세요.',
    btns: [{ label: '생성', type: 'deepblue' }],
  },
  gameResult: {
    message: '',
    messageFontSize: 'font-xl',
    btns: [
      { label: '재대결', type: 'deepblue' },
      { label: '나가기', type: 'skyblue' },
    ],
  },
  gamePause: {
    message: '',
    btns: [
      { label: '다시하기', type: 'skyblue' },
      { label: '계속하기', type: 'deepblue' },
      { label: '그만하기', type: 'red' },
    ],
  },
  error: {
    message: '',
    btns: [{ label: '확인', type: 'deepblue' }],
  },
};
