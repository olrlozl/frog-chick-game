import 'styles/components/common/NavBar/navbar.scss';
import { Menu } from 'components/common/NavBar/Menu';

export const NavBar = () => {
  return (
    <div className='navbar'>
      <Menu />
      <Menu />
      <Menu />
    </div>
  )
}

