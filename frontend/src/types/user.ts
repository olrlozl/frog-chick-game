export type GameModeType = 'local' | 'friend' | 'random';

export type UserStateType = 'online' | 'offline' | 'playing';

export interface KakaoLoginRequest {
  redirectUri: string;
  code: string;
}

export interface KakaoLoginResponse {
  userId: string;
  nickname: string | null;
}

export interface CreateNicknameRequest {
  nickname: string;
}

export interface CreateNicknameResponse {
  nickname: string;
}
