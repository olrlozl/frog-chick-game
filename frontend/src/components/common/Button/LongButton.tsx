interface LongButtonProps {
  option: 'frog' | 'chick';
  onClick: () => void;
}

const LongButton = ({ option, onClick }: LongButtonProps) => {
  return (
    <div className={`long-button ${option}`} onClick={onClick}>
      기권
    </div>
  );
};

export default LongButton;
