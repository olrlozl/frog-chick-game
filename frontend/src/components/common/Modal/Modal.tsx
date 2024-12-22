import React from 'react';
import ReactDOM from 'react-dom';
import OverLay from './OverLay';
import '../../../styles/components/common/Modal/modal.scss';

interface ModalProps {
  isOpen: boolean;
  imageSrc?: string;
  message: string;
  buttons: { label: string; onClick: () => void }[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  imageSrc,
  message,
  buttons,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <OverLay>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {imageSrc && (
          <img className="modal-image" src={imageSrc} alt="Modal Visual" />
        )}
        <div className="modal-message">{message}</div>
        <div className="modal-buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="modal-button"
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </OverLay>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
