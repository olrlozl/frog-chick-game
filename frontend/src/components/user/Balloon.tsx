import 'styles/components/user/balloon.scss';
import FriendSearchSection from 'components/user/FriendSearchSection';
import FriendListSection from 'components/user/FriendListSection';
import FriendRequestSection from 'components/user/FriendRequestSection';
import { GameOptionType } from 'types/user';
import BalloonTitle from 'components/user/BalloonTitle';
import loadingSpinner from 'assets/images/loading-spinner-tmp.png';
import ModalButton from 'components/common/Button/ModalButton';

interface BalloonProps {
  gameOption: GameOptionType;
}

const Balloon = ({ gameOption }: BalloonProps) => {

  const handleClickTmp = () => {};

  let content;
  if (gameOption === 'friend')
    content = (
      <>
        <FriendSearchSection />
        <FriendListSection />
        <FriendRequestSection />
      </>
    );
  else if (gameOption === 'stranger')
    content = (
      <>
        <BalloonTitle title="낯선이를 탐색중입니다..." />
        <img src={loadingSpinner} alt='로딩 스피너' />
        <ModalButton label="취소" onClick={handleClickTmp} type="cancel" />
      </>
    );

  return <div className={`balloon ${gameOption}`}>{content}</div>;
};

export default Balloon;
