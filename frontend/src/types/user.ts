export type GameModeType = 'local' | 'friend' | 'random';

export type UserStateType = 'online' | 'offline' | 'playing';

// API 관련
export interface NoNicknameUserkakaoLoginResponse {
  userId: string;
}

export interface KakaoLoginParams {
  redirectUri: string;
  code: string;
}

export interface CreateNicknameParams {
  userId: string;
  nickname: string;
}
