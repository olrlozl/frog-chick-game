import React from 'react';
import 'styles/components/common/Button/modal-button.scss';

interface ModalButtonProps {
  label: string;
  onClick: () => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({ label, onClick }) => {
  return (
    <button className="modal-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default ModalButton;
