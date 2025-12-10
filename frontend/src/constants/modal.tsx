import { MessageFontSize } from 'types/common';
import { ButtonColor } from './button';
import againIcon from 'assets/images/again-icon.png';
import continueIcon from 'assets/images/continue-icon.png';
import quitIcon from 'assets/images/quit-icon.png';

export interface ModalButton {
  label: string;
  color: ButtonColor;
  icon?: React.ReactNode;
}

interface ModalProps {
  message: string;
  messageFontSize?: MessageFontSize;
  btns: ModalButton[];
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
      {
        label: '다시하기',
        color: 'skyblue',
        icon: <img src={againIcon} alt="다시하기" />,
      },
      {
        label: '계속하기',
        color: 'deepblue',
        icon: <img src={continueIcon} alt="계속하기" />,
      },
      {
        label: '그만하기',
        color: 'red',
        icon: <img src={quitIcon} alt="그만하기" />,
      },
    ],
  },
  error: {
    message: '',
    btns: [{ label: '확인', color: 'deepblue' }],
  },
};
