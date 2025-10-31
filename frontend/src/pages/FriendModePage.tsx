import FriendSearchSection from 'components/user/FriendSearchSection';
import FriendListSection from 'components/user/FriendListSection';
import FriendRequestSection from 'components/user/FriendRequestSection';
import Header from 'components/common/Layout/Header';

const FriendModePage = () => {
  return (
    <div className="friend-mode-page">
      <Header title="친구 대전" />
      <div className="page-content">
        <FriendSearchSection />
        <FriendListSection />
        <FriendRequestSection />
      </div>
    </div>
  );
};

export default FriendModePage;
