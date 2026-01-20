import 'styles/components/common/Button/notification-button.scss';
import bellIcon from 'assets/images/bell.png';

interface NotificationButtonProps {
  unreadCount?: number;
  onClick: () => void;
}

const NotificationButton = ({
  unreadCount = 0,
  onClick,
}: NotificationButtonProps) => {
  return (
    <button
      className="notification-button"
      onClick={onClick}
      aria-label="알림 열기"
    >
      <img src={bellIcon} alt="종" />
      <span className="badge" aria-label={`안 읽은 항목 ${unreadCount}개`}>
        {unreadCount}
      </span>
    </button>
  );
};

export default NotificationButton;
