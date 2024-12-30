import game from 'assets/images/game.png';
import rank from 'assets/images/rank.png';
import guide from 'assets/images/guide.png';

export const NAVBAR_MENUS = [
  { to: '/main', imgSrc: game, text: '게임' },
  { to: '/main/rank', imgSrc: rank, text: '순위' },
  { to: '/main/guide', imgSrc: guide, text: '설명' },
];
