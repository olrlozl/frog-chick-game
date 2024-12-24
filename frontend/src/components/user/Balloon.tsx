import 'styles/components/user/balloon.scss';
import FriendSearchSection from 'components/user/FriendSearchSection';
import FriendListSection from 'components/user/FriendListSection';
import FriendRequestSection from 'components/user/FriendRequestSection';
import { GameType } from 'types/user';
import BalloonTitle from 'components/user/BalloonTitle';
import loadingSpinner from 'assets/images/loading-spinner-tmp.png';
import ModalButton from 'components/common/Button/ModalButton';

interface BalloonProps {
  option: GameType;
}

const Balloon = ({ option }: BalloonProps) => {

  const handleClickTmp = () => {};

  let content;
  if (option === 'friend')
    content = (
      <>
        <FriendSearchSection />
        <FriendListSection />
        <FriendRequestSection />
      </>
    );
  else if (option === 'stranger')
    content = (
      <>
        <BalloonTitle title="낯선이를 탐색중입니다..." />
        <img src={loadingSpinner} alt="" />
        <ModalButton label="취소" onClick={handleClickTmp} type="cancel" />
      </>
    );

  return <div className={`balloon ${option}`}>{content}</div>;
};

export default Balloon;
