import 'styles/components/common/NavBar/navbar.scss';
import { navbarMenus } from 'constants/navebarMenus';
import { Menu } from './Menu';

export const NavBar = () => {
  return (
    <div className="navbar">
      {navbarMenus.map((menu) => (
        <Menu key={menu.to} {...menu} />
      ))}
    </div>
  );
};
