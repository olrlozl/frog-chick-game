import 'styles/components/user/win-lose-box.scss';

interface WinLoseBoxProps {
  wins: number;
  losses: number;
  color: string;
  size: string;
}

const WinLoseBox = ({wins, losses, color, size}: WinLoseBoxProps) => {
  return (
    <div className={`win-lose-box ${color} ${size}`}>
        <span>{wins}승</span>
        <span>{losses}패</span>
      </div>
  )
}

export default WinLoseBox