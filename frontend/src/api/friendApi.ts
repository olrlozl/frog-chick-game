import {
  SearchFriendRequest,
  SearchFriendResponse,
  TargetFriendRequest,
  GetFriendListResponse,
} from 'types/friend';
import instance from './axiosInstance';
import { API_ENDPOINTS } from 'constants/apiEndpoints';

const searchFriend = async ({
  nickname,
}: SearchFriendRequest): Promise<SearchFriendResponse> => {
  const { data } = await instance.get(API_ENDPOINTS.SEARCH_FRIEND, {
    params: {
      nickname,
    },
  });
  return data;
};

const applyFriend = async ({ nickname }: TargetFriendRequest) => {
  await instance.post(API_ENDPOINTS.APPLY_FRIEND(nickname));
};

const cancelApplyFriend = async ({ nickname }: TargetFriendRequest) => {
  await instance.delete(API_ENDPOINTS.CANCEL_FRIEND_APPLY(nickname));
};

const getFriendList = async (): Promise<GetFriendListResponse> => {
  const { data } = await instance.get(API_ENDPOINTS.GET_FRIENDS);
  return data;
};

const acceptFriend = async ({ nickname }: TargetFriendRequest) => {
  await instance.post(API_ENDPOINTS.ACCEPT_FRIEND(nickname));
};

const rejectFriend = async ({ nickname }: TargetFriendRequest) => {
  await instance.post(API_ENDPOINTS.REJECT_FRIEND(nickname));
};

const deleteFriend = async ({ nickname }: TargetFriendRequest) => {
  await instance.delete(API_ENDPOINTS.DELETE_FRIEND(nickname));
};

export {
  searchFriend,
  applyFriend,
  cancelApplyFriend,
  getFriendList,
  acceptFriend,
  rejectFriend,
  deleteFriend,
};
