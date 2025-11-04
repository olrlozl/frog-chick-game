import { ButtonColor, ButtonType } from 'constants/button';
import 'styles/components/common/Button/basic-button.scss';

interface BasicButtonProps {
  type: ButtonType;
  label: string;
  color: ButtonColor;
  onClick: () => void;
  disabled?: boolean;
}

const BasicButton = ({
  type,
  label,
  color,
  onClick,
  disabled = false,
}: BasicButtonProps) => {
  return (
    <button
      className={`basic-button ${type} ${color} ${disabled ? 'disabled' : undefined}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default BasicButton;
