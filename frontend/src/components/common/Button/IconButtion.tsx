import 'styles/components/common/Button/icon-button.scss';

interface IconButtonProps {
  iconSrc: string;
  alt: string;
  onClick: () => void;
}

const IconButton = ({ iconSrc, alt, onClick }: IconButtonProps) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <img src={iconSrc} alt={alt} />
    </button>
  );
};

export default IconButton;
