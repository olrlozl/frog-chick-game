import 'styles/components/common/Button/mini-button.scss';

interface MiniButtonProps {
  miniButtonOption: 'search' | 'add' | 'game' | 'accept' | 'reject';
}

const MiniButton = ({miniButtonOption}: MiniButtonProps) => {
  
  const handleClickSearchNickname = () => {
    
  }

  const handleClickAddFriend = () => {
    
  }

  const handleClickRequestGame = () => {
    
  }

  const handleClickAcceptFriend = () => {
    
  }

  const handleClickRejectFriend = () => {
    
  }

  const miniButtonOptions = {
    search: { text: '검색', onClick: handleClickSearchNickname},
    add: { text: '친구추가', onClick: handleClickAddFriend},
    game: { text: '대결신청', onClick: handleClickRequestGame},
    accept: { text: '수락', onClick: handleClickAcceptFriend},
    reject: { text: '거절', onClick: handleClickRejectFriend},
  }
  const { onClick, text } = miniButtonOptions[miniButtonOption];

  return (
    <div className={`mini-button ${miniButtonOption}`} onClick={onClick}>
      {text}
    </div>
  )
}

export default MiniButton