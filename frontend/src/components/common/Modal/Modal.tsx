import React from 'react';
import ReactDOM from 'react-dom';
import ModalButton from 'components/common/Button/ModalButton';
import 'styles/components/common/Modal/modal.scss';

interface ModalProps {
  isOpen: boolean;
  imageSrc?: string;
  message: string;
  btns: { label: string; onClick: () => void }[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, imageSrc, message, btns }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      {imageSrc && <img className="image" src={imageSrc} alt="Modal Visual" />}
      <div className="message">{message}</div>
      <div className="buttons">
        {btns.map((btn, index) => (
          <ModalButton
            key={index}
            label={btn.label}
            onClick={btn.onClick}
          ></ModalButton>
        ))}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
