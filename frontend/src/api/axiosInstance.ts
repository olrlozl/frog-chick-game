import axios, { AxiosError } from 'axios';
import { refreshJwtAccessToken } from './userApi';
import { ErrorMessageKeys } from 'constants/errorMessages';
import { ENV } from '../config/env';
import { useNicknameModalStore } from 'stores/nicknameModalStore';

const instance = axios.create({
  baseURL: ENV.API_URL_DEV + '/api',
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    if (config.data) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 요청 대기열과 토큰 갱신 중인지 확인하는 변수
let refreshingPromise: Promise<boolean> | null = null;
const requestQueue: (() => void)[] = [];

export const setAxiosInterceptorResponse = (
  setErrorMessage: (errorKey: ErrorMessageKeys, errorType: string) => void
) => {
  const interceptorId = instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (!(err instanceof AxiosError)) {
        setErrorMessage('COMMON', 'UNKNOWN_ERROR');
        return Promise.reject(err);
      }

      if (!err.response) {
        setErrorMessage('COMMON', 'NETWORK_ERROR');
        return Promise.reject(err);
      }

      const errorType = err.response.data?.errorType;

      if (
        errorType === 'INVALID_USERID' ||
        errorType === 'INVALID_JWT_TOKEN' ||
        errorType === 'MISSING_JWT_ACCESS_TOKEN' ||
        errorType === 'REVOKED_JWT_TOKEN'
      ) {
        setErrorMessage('COMMON', 'RE_LOGIN');
        return Promise.reject(err);
      }

      if (errorType === 'NICKNAME_REQUIRED') {
        const { isOpen, openModal } = useNicknameModalStore.getState();
        if (!isOpen) openModal();
        return Promise.reject(err);
      }

      if (errorType === 'INTERNAL_SERVER_ERROR' || err.response.status >= 500) {
        setErrorMessage('COMMON', 'INTERNAL_SERVER_ERROR');
        return Promise.reject(err);
      }

      // 친구 액션 결과 존재하지 않는 사용자일 경우 전역 에러 모달 처리
      if (errorType === 'UNKNOWN_USER') {
        setErrorMessage('COMMON', 'UNKNOWN_USER');
        return Promise.reject(err);
      }

      //  access token 만료면 refresh 후 원요청 재시도
      if (errorType === 'EXPIRED_JWT_TOKEN') {
        const originalRequestConfig = err.config;
        if (!originalRequestConfig) return Promise.reject(err);

        // 토큰 갱신이 진행 중이라면 요청을 대기열에 추가
        if (refreshingPromise) {
          return new Promise((resolve) => {
            requestQueue.push(() => {
              resolve(instance(originalRequestConfig));
            });
          });
        }

        // 토큰 갱신을 시작 (한 번만 실행)
        refreshingPromise = (async () => {
          try {
            await refreshJwtAccessToken();
            // 대기 중인 요청을 한꺼번에 실행
            requestQueue.forEach((callback) => callback());
            requestQueue.length = 0; // 큐 초기화
            return true;
          } catch (refreshJwtAccessTokenApiError) {
            if (
              refreshJwtAccessTokenApiError instanceof AxiosError &&
              refreshJwtAccessTokenApiError.response &&
              refreshJwtAccessTokenApiError.response.data.errorType ===
                'JWT_ACCESS_TOKEN_NOT_EXPIRED'
            ) {
              return true;
            } else {
              setErrorMessage('COMMON', 'RE_LOGIN');
              return false;
            }
          } finally {
            refreshingPromise = null; // 갱신 완료 후 null로 초기화
          }
        })();

        // 새로운 토큰을 받아서 요청을 재시도
        return refreshingPromise.then((success) => {
          if (success) {
            return instance(originalRequestConfig);
          }
          return Promise.reject(err);
        });
      }

      return Promise.reject(err);
    }
  );
  return interceptorId;
};

export default instance;
