export const API_ENDPOINTS = {
  KAKAO_LOGIN: '/user/login/kakao',
  KAKAO_LOGOUT: '/user/logout/kakao',
  CREATE_NICKNAME: '/user/nickname',
  REFRESH_JWT_ACCESS_TOKEN: '/user/refresh/jwt-access-token',
  SEARCH_FRIEND: '/friend/search',
  GET_FRIENDS: '/friend',
  APPLY_FRIEND: '/friend/apply',
  GET_FRIEND_RECEIPTS: '/friend/receipts',
  ACCEPT_FRIEND: (nickname: string) => `friend/accept/${nickname}`,
  REJECT_FRIEND: (nickname: string) => `friend/reject/${nickname}`,
  CANCEL_FRIEND_APPLY: (nickname: string) => `friend/apply/${nickname}`,
  GET_RANK: '/rank',
};
