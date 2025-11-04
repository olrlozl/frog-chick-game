import { MessageFontSize } from 'types/common';
import { ButtonColor } from './button';

interface ModalProps {
  message: string;
  messageFontSize?: MessageFontSize;
  btns: { label: string; color: ButtonColor }[];
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
      { label: '확인', color: 'deepblue' },
      { label: '취소', color: 'skyblue' },
    ],
  },
  createNickname: {
    message: '닉네임을 입력해주세요.',
    btns: [{ label: '생성', color: 'deepblue' }],
  },
  gameResult: {
    message: '',
    messageFontSize: 'font-xl',
    btns: [
      { label: '재대결', color: 'deepblue' },
      { label: '나가기', color: 'skyblue' },
    ],
  },
  gamePause: {
    message: '',
    btns: [
      { label: '다시하기', color: 'skyblue' },
      { label: '계속하기', color: 'deepblue' },
      { label: '그만하기', color: 'red' },
    ],
  },
  error: {
    message: '',
    btns: [{ label: '확인', color: 'deepblue' }],
  },
};
