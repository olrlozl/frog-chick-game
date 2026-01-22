export type ErrorMessageKeys =
  | 'KAKAO_LOGIN'
  | 'KAKAO_LOGOUT'
  | 'CREATE_NICKNAME'
  | 'SEARCH_FRIEND'
  | 'GET_FRIEND'
  | 'APPLY_FRIEND'
  | 'ACCEPT_FRIEND'
  | 'REJECT_FRIEND'
  | 'CANCEL_APPLY_FRIEND'
  | 'DELETE_FRIEND'
  | 'GET_RANKS'
  | 'COMMON';

type ErrorMessages = {
  [K in ErrorMessageKeys]: { [key: string]: string };
};

// interface ErrorMessages {
//   [key: string]: { [key: string]: string};
// }

export const COMMON_MESSAGES = {
  RE_LOGIN: '다시 로그인 해주세요.',
  RETRY: '잠시 후 다시 시도해주세요.',
};

// key: 서버에서 응답받은 errorType
// value: 클라이언트에 보여줄 에러 문구
// 모든 api에 공통으로 나올 수 있는 error는 COMMON에 정의
export const ERROR_MESSAGES: ErrorMessages = {
  KAKAO_LOGIN: {
    FAILED_KAKAO_LOGIN: '카카오 로그인에\n실패하였습니다.',
    INVALID_REDIRECT_URI: '카카오 로그인에\n실패하였습니다.',
    INVALID_CODE: '카카오 로그인에\n실패하였습니다.',
    FAILED_GET_KAKAOID: '카카오 로그인에\n실패하였습니다.',
  },
  KAKAO_LOGOUT: {
    FAILED_KAKAO_LOGOUT: COMMON_MESSAGES.RETRY,
    MISSING_USER_ID: COMMON_MESSAGES.RETRY,
  },
  CREATE_NICKNAME: {
    FAILED_CREATE_USER: COMMON_MESSAGES.RETRY,
    MISSING_USERID: COMMON_MESSAGES.RE_LOGIN,
    MISSING_NICKNAME: '닉네임을 입력해주세요.',
    INVALID_USERID: COMMON_MESSAGES.RE_LOGIN,
    INVALID_NICKNAME: '한글, 영어 2~6자',
    NOT_FOUND_USER: COMMON_MESSAGES.RE_LOGIN,
    DUPLICATED_NICKNAME: '이미 사용중인 닉네임입니다.',
    ALREADY_EXISTS_NICKNAME: '이미 닉네임이 있습니다.',
  },
  SEARCH_FRIEND: {
    FAILED_SEARCH_USER: COMMON_MESSAGES.RETRY,
    UNKNOWN_USER: '사용자를 찾을 수 없습니다.',
    CANNOT_SEARCH_SELF: '본인은 검색할 수 없습니다.',
  },
  GET_FRIEND: {
    FAILED_GET_FRIEND_LIST: COMMON_MESSAGES.RETRY,
    INVALID_USERID: COMMON_MESSAGES.RE_LOGIN,
  },
  APPLY_FRIEND: {
    FAILED_APPLY_FRIEND: COMMON_MESSAGES.RETRY,
    UNKNOWN_USER: '존재하지 않는 유저입니다.',
    INVALID_USERID: COMMON_MESSAGES.RE_LOGIN,
  },
  ACCEPT_FRIEND: {
    FAILED_ACCEPT_FRIEND: COMMON_MESSAGES.RETRY,
    UNKNOWN_USER: '존재하지 않는 유저입니다.',
    NOT_FOUND_FRIEND_REQUEST: '수락할 친구 요청이 존재하지 않습니다.',
    INVALID_USERID: COMMON_MESSAGES.RE_LOGIN,
  },
  REJECT_FRIEND: {
    FAILED_ACCEPT_FRIEND: COMMON_MESSAGES.RETRY,
    UNKNOWN_USER: '존재하지 않는 유저입니다.',
    NOT_FOUND_FRIEND_REQUEST: '거절할 친구 요청이 존재하지 않습니다.',
    INVALID_USERID: COMMON_MESSAGES.RE_LOGIN,
  },
  CANCEL_APPLY_FRIEND: {
    FAILED_CANCEL_APPLY_FRIEND: COMMON_MESSAGES.RETRY,
    UNKNOWN_USER: '존재하지 않는 유저입니다.',
    INVALID_USERID: COMMON_MESSAGES.RE_LOGIN,
  },
  DELETE_FRIEND: {
    FAILED_DELETE_FRIEND: COMMON_MESSAGES.RETRY,
    UNKNOWN_USER: '존재하지 않는 유저입니다.',
    INVALID_USERID: COMMON_MESSAGES.RE_LOGIN,
  },
  GET_RANKS: {
    FAILED_GET_RANKS: COMMON_MESSAGES.RETRY,
    INVALID_USERID: COMMON_MESSAGES.RE_LOGIN,
  },
  COMMON: {
    ERR_NETWORK: '서버 연결이 불안정합니다.\n잠시 후 다시 시도해주세요.',
    MISSING_JWT_ACCESS_TOKEN: COMMON_MESSAGES.RE_LOGIN,
    OTHER: '오류가 발생했습니다.\n잠시 후 다시 시도해주세요.',
    RE_LOGIN: '다시 로그인 해주세요.',
  },
};
