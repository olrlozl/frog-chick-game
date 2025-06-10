import { UserInfoInterface, UserStateType } from 'types/user';

export interface SearchFriendParams {
  nickname: string;
}

export interface SearchFriendResponse {
  nickname: string;
  wins: number;
  losses: number;
  isSent: boolean;
  isFriend: boolean;
}

export interface ApplyFriendParams {
  to: string;
}

type FriendList = {
  userInfo: UserInfoInterface;
  state: UserStateType;
}[];

export interface GetFriendListResponse {
  friendList: FriendList;
}

type ReceivedList = {
  nickname: string;
}[];

export interface GetReceivedFriendListResponse {
  receivedList: ReceivedList;
}

export interface AcceptFriendParams {
  from: string;
}
