import 'styles/components/common/Button/modal-button.scss';

interface ModalButtonProps {
  label: string;
  onClick: () => void;
  type: 'primary' | 'secondary' | 'cancel';
}

const ModalButton = ({ label, onClick, type }: ModalButtonProps) => {
  return (
    <button className={`modal-button ${type}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default ModalButton;
