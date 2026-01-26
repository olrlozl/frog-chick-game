import FriendSearchSection from 'components/user/FriendSearchSection';
import FriendListSection from 'components/user/FriendListSection';
import Header from 'components/common/Layout/Header';
import NotificationButton from 'components/user/NotificationButton';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import { useFriendModalStore } from 'stores/friendModalStore';
import FriendModalHost from 'components/common/Modal/FriendModalHost';

const FriendModePage = () => {
  const queryClient = useQueryClient();
  const { openModal } = useFriendModalStore();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);

  const handleRefresh = () => {
    setIsSearchActive(false);
    setRefreshTick((prev) => prev + 1);
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.friend],
      exact: true,
    });
  };

  const openDeleteModal = (nickname: string) =>
    openModal({ type: 'DELETE_FRIEND', nickname });

  const openInviteSentModal = (nickname: string) =>
    openModal({ type: 'INVITE_SENT', nickname });

  const openInviteReceivedModal = (nickname: string) =>
    openModal({ type: 'INVITE_RECEIVED', nickname });

  const invitationCount = 1;

  return (
    <div className="friend-mode-page">
      <Header title="친구 대전" showRefresh onRefresh={handleRefresh} />
      <div className="page-content">
        <FriendSearchSection
          onChangeIsSearchActive={setIsSearchActive}
          refreshTick={refreshTick}
          onInviteFriend={openInviteSentModal}
          onDeleteFriend={openDeleteModal}
        />
        <FriendListSection
          hidden={isSearchActive}
          onInviteFriend={openInviteSentModal}
          onDeleteFriend={openDeleteModal}
        />
      </div>
      <NotificationButton
        unreadCount={invitationCount}
        onClick={() => openInviteReceivedModal('짱구는못말려')}
      />
      <FriendModalHost />
    </div>
  );
};

export default FriendModePage;
