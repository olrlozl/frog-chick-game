import 'styles/components/common/Button/basic-button.scss';
import { ButtonColor } from 'types/common';

interface BasicButtonProps {
  label: string;
  onClick: () => void;
  type: ButtonColor;
  isLoading?: boolean;
}

const BasicButton = ({
  label,
  onClick,
  type,
  isLoading = false,
}: BasicButtonProps) => {
  return (
    <button
      className={`basic-button ${type} ${isLoading ? 'disabled' : undefined}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default BasicButton;
