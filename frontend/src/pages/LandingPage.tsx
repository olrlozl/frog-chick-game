import logo from 'assets/images/logo.png';
import board from 'assets/images/board.png';
import kakaoImg from 'assets/images/kakao.png';
import 'styles/pages/landing-page.scss';
import { useEffect } from 'react';
import { useLogin } from 'hooks/user/useLogin';
import BasicButton from 'components/common/Button/BasicButton';
import { ENV } from '../config/env';

const LandingPage = () => {
  // 1. 카카오 로그인 버튼 클릭
  const handleClickGetKakaoCode = () => {
    window.location.href =
      `https://kauth.kakao.com/oauth/authorize?` +
      `client_id=${ENV.REST_API_KEY}` +
      `&redirect_uri=${ENV.REDIRECT_URI}` +
      `&response_type=code`;
  };

  // 2. 리다이렉션 후 카카오 로그인
  const code = new URL(window.location.href).searchParams.get('code');

  const executeKakaoLogin = useLogin();

  useEffect(() => {
    if (!code) return;
    executeKakaoLogin({ redirectUri: ENV.REDIRECT_URI, code });

    //로그인 시도 시작했으면 code 제거해서 중복 호출 방지
    const url = new URL(window.location.href);
    url.searchParams.delete('code');
    window.history.replaceState({}, '', url.toString());
  }, [code, executeKakaoLogin]);

  return (
    <div className="landing-page">
      <img className="logo" src={logo} alt="로고" />
      <img className="board-img" src={board} alt="게임판" />
      <BasicButton
        type="kakao"
        color="yellow"
        label="카카오 로그인"
        onClick={handleClickGetKakaoCode}
        leftIcon={<img src={kakaoImg} alt="카카오" />}
      />
    </div>
  );
};

export default LandingPage;
