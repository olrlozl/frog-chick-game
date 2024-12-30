import { NavLink } from 'react-router-dom';
import 'styles/components/common/NavBar/menu.scss';

interface MenuProps {
  to: string;
  imgSrc: string;
  text: string;
}

export const Menu = ({ to, imgSrc, text }: MenuProps) => {
  return (
    <div className="menu">
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? 'active' : undefined)}
        end={to === '/main'}
      >
        <img src={imgSrc} alt={text} />
        <span>{text}</span>
      </NavLink>
    </div>
  );
};
