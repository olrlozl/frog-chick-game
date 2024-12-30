import kakao from 'assets/images/kakao.png';
import 'styles/components/account/logout.scss';

const Logout = () => {
  return (
    <div className='logout'>
      <img src={kakao} alt='카카오' />
      <span>로그아웃</span>
    </div>
  )
}

export default Logout
