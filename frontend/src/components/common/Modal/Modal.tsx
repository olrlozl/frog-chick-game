import React from 'react';
import ReactDOM from 'react-dom';
import ModalButton from 'components/common/Button/ModalButton';
import 'styles/components/common/Modal/modal.scss';

interface ModalProps {
  isOpen: boolean;
  imageSrc?: string;
  message: string;
  messageFontSize?: 'font-xl' | 'font-md';
  hasNicknameInput?: boolean;
  btns: { label: string; onClick: () => void; type: 'primary' | 'secondary' }[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  imageSrc,
  message,
  messageFontSize,
  hasNicknameInput = false,
  btns,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      {imageSrc && <img className="image" src={imageSrc} alt="Modal Visual" />}
      <div className={`message ${messageFontSize}`}>{message}</div>
      {hasNicknameInput && (
        <div className="nickname-input">
          <input
            type="text"
            placeholder="한글, 영어 2~6자"
            pattern="^[가-힣a-zA-Z]{2,6}$"
            minLength={2}
            maxLength={6}
          />
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
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
