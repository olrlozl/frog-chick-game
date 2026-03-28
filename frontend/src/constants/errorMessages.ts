export type ErrorMessageKeys =
  | 'COMMON'
  | 'KAKAO_LOGIN'
  | 'KAKAO_LOGOUT'
  | 'CREATE_NICKNAME'
  | 'SEARCH_FRIEND'
  | 'APPLY_FRIEND';
// | 'GET_FRIEND'
// | 'ACCEPT_FRIEND'
// | 'REJECT_FRIEND'
// | 'CANCEL_APPLY_FRIEND'
// | 'DELETE_FRIEND'
// | 'GET_RANKS';

type ErrorMessages = {
  [K in ErrorMessageKeys]: { [key: string]: string };
};

export const ERROR_MESSAGES: ErrorMessages = {
  COMMON: {
    RE_LOGIN: '다시 로그인 해주세요.',
    UNKNOWN_USER: '존재하지 않는 사용자입니다.',
    INTERNAL_SERVER_ERROR:
      '서버에서 요청을 처리하는 중\n문제가 발생했습니다.\n잠시 후 다시 시도해주세요.',
    NETWORK_ERROR: '서버 연결이 불안정합니다.\n잠시 후 다시 시도해주세요.',
    UNKNOWN_ERROR:
      '알 수 없는 오류가\n발생했습니다.\n잠시 후 다시 시도해주세요.',
  },
  KAKAO_LOGIN: {
    INVALID_OAUTH_REQUEST: '카카오 로그인에\n실패했습니다.',
    OAUTH_FAILED: '카카오 로그인에\n실패했습니다.',
  },
  KAKAO_LOGOUT: {
    REVOKED_JWT_TOKEN: '이미 로그아웃되었습니다.',
    OAUTH_FAILED: '카카오 로그아웃에\n실패했습니다.',
  },
  CREATE_NICKNAME: {
    MISSING_NICKNAME: '닉네임을 입력해주세요.',
    INVALID_NICKNAME: '한글, 영어 2~6자',
    DUPLICATED_NICKNAME: '이미 사용중인 닉네임입니다.',
    ALREADY_EXISTS_NICKNAME: '이미 닉네임이 있습니다.',
  },
  SEARCH_FRIEND: {
    NOT_FOUND_USER: '사용자를 찾을 수 없습니다.',
    CANNOT_SEARCH_SELF: '본인은 검색할 수 없습니다.',
  },
  APPLY_FRIEND: {
    ALREADY_FRIEND: '이미 친구입니다.',
    ALREADY_APPLY_FRIEND: '이미 친구 신청을 보냈습니다.',
  },
  // GET_FRIEND: {},
  // CANCEL_APPLY_FRIEND: {},
  // ACCEPT_FRIEND: {},
  // REJECT_FRIEND: {},
  // DELETE_FRIEND: {},
  // GET_RANKS: {},
};
