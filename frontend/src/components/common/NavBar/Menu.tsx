import 'styles/components/common/NavBar/menu.css';
import game from '../../../assets/images/game.png';

// const NAVBAR_MENUS = [
//   { image: game, text: '게임' },
//   { image: rank, text: '순위' },
//   { image: guide, text: '설명' },
// ];

export const Menu = () => {
  return (
    <div className='menu'>
      <img src={game} alt="" />
      <span>게임</span>
    </div>
    
  )
}
