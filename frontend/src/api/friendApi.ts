import {
  handelFriendRequestParams,
  ApplyFriendParams,
  GetFriendListResponse,
  SearchFriendParams,
  SearchFriendResponse,
} from 'types/friend';
import instance from './axiosInstance';
import { API_ENDPOINTS } from 'constants/apiEndpoints';

const searchFriend = async ({
  nickname,
}: SearchFriendParams): Promise<SearchFriendResponse> => {
  const { data } = await instance.get(API_ENDPOINTS.SEARCH_FRIEND, {
    params: {
      nickname,
    },
  });
  return data;
};

const applyFriend = async ({ to }: ApplyFriendParams) => {
  await instance.post(API_ENDPOINTS.APPLY_FRIEND, {
    to,
  });
};

const cancelApplyFriend = async ({ to }: ApplyFriendParams) => {
  await instance.delete(API_ENDPOINTS.CANCEL_FRIEND_APPLY(to));
};

const getFriendList = async (): Promise<GetFriendListResponse> => {
  const { data } = await instance.get(API_ENDPOINTS.GET_FRIENDS);
  return data;
};

const acceptFriend = async ({ from }: handelFriendRequestParams) => {
  await instance.post(API_ENDPOINTS.ACCEPT_FRIEND(from));
};

const rejectFriend = async ({ from }: handelFriendRequestParams) => {
  await instance.post(API_ENDPOINTS.REJECT_FRIEND(from));
};

export {
  searchFriend,
  applyFriend,
  cancelApplyFriend,
  getFriendList,
  acceptFriend,
  rejectFriend,
};
