import 'styles/components/user/friend-search-section.scss';
import NicknameInput from 'components/user/NicknameInput';
import { useEffect, useState } from 'react';
import { ErrorMessage } from 'components/common/Modal/ErrorMessage';
import { SearchFriendResponse } from 'types/friend';
import { useSearchFriend } from 'hooks/friend/useSearchFriend';
import BasicButton from 'components/common/Button/BasicButton';
import { BUTTON_INFO } from 'constants/button';
import { useFriendManager } from 'hooks/friend/useFriendManager';
import FriendUserCard from './userCard/FriendUserCard';
import ReceivedUserCard from './userCard/ReceivedUserCard';
import SentUserCard from './userCard/SentUserCard';

interface FriendSearchSectionProps {
  onChangeHasResult: (hasResult: boolean) => void;
}

const FriendSearchSection = ({
  onChangeHasResult,
}: FriendSearchSectionProps) => {
  const [nickname, setNickname] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');

  const {
    userInfo,
    searchFriendLoading,
    validateInputedNickname,
    executeApplyFriend,
    executeCancelApplyFriend,
    isApplyFriendLoading,
    isCancelApplyFriendLoading,
  } = useSearchFriend(nickname, setNicknameErrorMessage);

  const {
    executeAcceptFriend,
    isAcceptFriendLoading,
    executeRejectFriend,
    isRejectFriendLoading,
  } = useFriendManager();

  useEffect(() => {
    onChangeHasResult(!!userInfo || !!nicknameErrorMessage);
  }, [userInfo, nicknameErrorMessage, onChangeHasResult]);

  const userCard = (userInfo: SearchFriendResponse) => {
    if (userInfo.isFriend)
      return (
        <FriendUserCard
          nickname={userInfo.nickname}
          state={userInfo.state}
          onInvite={() => {}}
          onDelete={() => {}}
        />
      );
    if (userInfo.isReceived)
      return (
        <ReceivedUserCard
          nickname={userInfo.nickname}
          executeAcceptFriend={executeAcceptFriend}
          executeRejectFriend={executeRejectFriend}
          isAcceptFriendLoading={isAcceptFriendLoading}
          isRejectFriendLoading={isRejectFriendLoading}
        />
      );

    return (
      <SentUserCard
        nickname={nickname}
        isSent={userInfo.isSent}
        executeApplyFriend={executeApplyFriend}
        executeCancelApplyFriend={executeCancelApplyFriend}
        isApplyFriendLoading={isApplyFriendLoading}
        isCancelApplyFriendLoading={isCancelApplyFriendLoading}
      />
    );
  };

  return (
    <div className="friend-search-section">
      <div className="friend-search-box">
        <NicknameInput
          text="닉네임을 입력해주세요."
          nickname={nickname}
          setNickname={setNickname}
          setErrorMessage={setNicknameErrorMessage}
          onEnter={validateInputedNickname}
        />
        <BasicButton
          type="middle"
          label={BUTTON_INFO.search.label}
          color={BUTTON_INFO.search.color}
          onClick={validateInputedNickname}
          disabled={searchFriendLoading}
        />
      </div>

      <div className="result-box">
        {userInfo && userCard(userInfo)}
        {nicknameErrorMessage && (
          <ErrorMessage errorMessage={nicknameErrorMessage} />
        )}
      </div>
    </div>
  );
};
export default FriendSearchSection;
