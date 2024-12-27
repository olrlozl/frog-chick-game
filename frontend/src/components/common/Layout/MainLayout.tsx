import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar'

const MainLayout = () => {
  return (
    <div className='main-layout'>
      <Outlet />
      <NavBar />
    </div>
  )
}

export default MainLayout