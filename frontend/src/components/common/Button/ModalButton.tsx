import React from 'react';
import 'styles/components/common/Button/modal-button.scss';

interface ModalButtonProps {
  label: string;
  onClick: () => void;
  type: 'primary' | 'secondary';
}

const ModalButton: React.FC<ModalButtonProps> = ({ label, onClick, type }) => {
  return (
    <button className={`modal-button ${type}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default ModalButton;
