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

export interface TargetUserParams {
  to: string;
}
export interface FriendItem {
  nickname: string;
  state: UserStateType;
}

export interface GetFriendListResponse {
  friends: FriendItem[];
  friendRequests: { received: FriendItem[]; sent: FriendItem[] };
}

export interface HandelFriendRequestParams {
  from: string;
}
