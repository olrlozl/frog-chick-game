import ReactDOM from 'react-dom';
import BasicButton from 'components/common/Button/BasicButton';
import 'styles/components/common/Modal/modal.scss';
import OverLay from 'components/common/Modal/OverLay';
import { ReactNode } from 'react';
import NicknameInput from 'components/user/NicknameInput';
import { ErrorMessage } from './ErrorMessage';
import { ModalImage } from './ModalImage';
import { ModalMessage } from './ModalMessage';
import { ButtonColor } from 'constants/button';

interface ModalProps {
  isOpen: boolean;
  btns: { label: string; color: ButtonColor }[];
  buttonActions: (() => void)[];
  buttonDirection?: 'row' | 'column';
  isLoading?: boolean;
  children?: ReactNode;
}

const Modal = ({
  isOpen,
  btns,
  buttonActions,
  buttonDirection = 'row',
  isLoading = false,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <OverLay />
      <div className="container" onClick={(e) => e.stopPropagation()}>
        {children}
        <div className={`buttons ${buttonDirection}`}>
          {btns.map((btn, index) => (
            <BasicButton
              type="modal"
              key={index}
              label={btn.label}
              onClick={buttonActions[index]}
              color={btn.color}
              disabled={isLoading}
            />
          ))}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;

Modal.Message = ModalMessage;
Modal.NicknameInput = NicknameInput;
Modal.ErrorMessage = ErrorMessage;
Modal.Image = ModalImage;
