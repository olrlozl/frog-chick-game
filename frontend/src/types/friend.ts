import { UserStateType } from 'types/user';

export interface SearchFriendParams {
  nickname: string;
}

export interface SearchFriendResponse {
  nickname: string;
  state: UserStateType;
  isFriend: boolean;
  isSent: boolean;
  isReceived: boolean;
}

export interface ApplyFriendParams {
  to: string;
}
export interface FriendItem {
  nickname: string;
  state: UserStateType;
}

export interface GetFriendListResponse {
  friends: FriendItem[];
  friendRequests: FriendItem[];
}

export interface handelFriendRequestParams {
  from: string;
}
