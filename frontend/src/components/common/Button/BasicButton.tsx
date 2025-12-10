import { ButtonColor, ButtonType } from 'constants/button';
import 'styles/components/common/Button/basic-button.scss';

interface BasicButtonProps {
  type: ButtonType;
  label: string;
  color: ButtonColor;
  onClick: () => void;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
}

const BasicButton = ({
  type,
  label,
  color,
  onClick,
  disabled = false,
  leftIcon,
}: BasicButtonProps) => {
  return (
    <button
      className={`basic-button ${type} ${color} ${disabled ? 'disabled' : ''} ${leftIcon ? 'with-icon' : ''}`}
      onClick={onClick}
    >
      {leftIcon && <span className="icon">{leftIcon}</span>}
      <span className="label">{label}</span>
    </button>
  );
};

export default BasicButton;
