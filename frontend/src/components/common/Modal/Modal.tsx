import React from 'react';
import ReactDOM from 'react-dom';
import ModalButton from 'components/common/Button/ModalButton';
import 'styles/components/common/Modal/modal.scss';

interface ModalProps {
  isOpen: boolean;
  imageSrc?: string;
  message: string;
  messageFontSize?: 'font-xl' | 'font-md';
  btns: { label: string; onClick: () => void; type: 'primary' | 'secondary' }[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  imageSrc,
  message,
  messageFontSize,
  btns,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      {imageSrc && <img className="image" src={imageSrc} alt="Modal Visual" />}
      <div className={`message ${messageFontSize}`}>{message}</div>
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
