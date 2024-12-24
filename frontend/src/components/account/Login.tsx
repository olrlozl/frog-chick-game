import kakao from 'assets/images/kakao.png';
import 'styles/components/account/login.scss';

const Login = () => {
  return (
    <div className='login'>
      <img src={kakao} alt="" />
      <span>카카오로 3초 만에 시작하기</span>
    </div>
  )
}

export default Login
