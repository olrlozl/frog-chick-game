import 'styles/components/common/NavBar/navbar.scss';
import { NAVBAR_MENUS } from 'constants/navbarMenus';
import { Menu } from 'components/common/NavBar/Menu';

export const NavBar = () => {
  return (
    <div className="navbar">
      {NAVBAR_MENUS.map((menu) => (
        <Menu key={menu.to} {...menu} />
      ))}
    </div>
  );
};
