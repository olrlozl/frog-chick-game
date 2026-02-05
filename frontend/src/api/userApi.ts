import {
  CreateNicknameRequest,
  CreateNicknameResponse,
  KakaoLoginRequest,
  KakaoLoginResponse,
} from 'types/user';
import instance from './axiosInstance';
import { API_ENDPOINTS } from 'constants/apiEndpoints';

const kakaoLogin = async ({
  redirectUri,
  code,
}: KakaoLoginRequest): Promise<KakaoLoginResponse> => {
  const { data } = await instance.post(API_ENDPOINTS.KAKAO_LOGIN, {
    redirectUri,
    code,
  });
  return data;
};

const kakaoLogout = async () => {
  await instance.post(API_ENDPOINTS.KAKAO_LOGOUT);
};

const createNickname = async ({
  nickname,
}: CreateNicknameRequest): Promise<CreateNicknameResponse> => {
  const { data } = await instance.post(API_ENDPOINTS.CREATE_NICKNAME, {
    nickname,
  });
  return data;
};

const refreshJwtAccessToken = async () => {
  await instance.post(API_ENDPOINTS.REFRESH_JWT_ACCESS_TOKEN);
};

export { kakaoLogin, kakaoLogout, createNickname, refreshJwtAccessToken };
