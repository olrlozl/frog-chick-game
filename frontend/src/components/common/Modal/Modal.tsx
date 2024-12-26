import ReactDOM from 'react-dom';
import ModalButton from 'components/common/Button/ModalButton';
import 'styles/components/common/Modal/modal.scss';
import NicknameInput from 'components/user/NicknameInput';
import OverLay from 'components/common/Modal/OverLay';

interface ModalProps {
  isOpen: boolean;
  imageSrc?: string;
  message: string;
  messageFontSize?: 'font-xl' | 'font-md';
  hasNicknameInput?: boolean;
  btns: { label: string; onClick: () => void; type: 'primary' | 'secondary' }[];
}

const Modal = ({
  isOpen,
  imageSrc,
  message,
  messageFontSize,
  hasNicknameInput = false,
  btns,
}: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <OverLay />
      <div className="container" onClick={(e) => e.stopPropagation()}>
        {imageSrc && (
          <img className="image" src={imageSrc} alt="Modal Visual" />
        )}
        <div className={`message ${messageFontSize}`}>{message}</div>
        {hasNicknameInput && (
          <div className="nickname-input">
            <NicknameInput text="한글, 영어 2~6자" />
            <div className="error-message">이미 사용중인 닉네임입니다.</div>
          </div>
        )}
        <div className="buttons">
          {btns.map((btn, index) => (
            <ModalButton
              key={index}
              label={btn.label}
              onClick={btn.onClick}
              type={btn.type}
            ></ModalButton>
          ))}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
