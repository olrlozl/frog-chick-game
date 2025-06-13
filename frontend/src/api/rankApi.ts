import { GetRankListResponse } from 'types/rank';
import instance from './axiosInstance';
import { API_ENDPOINTS } from 'constants/apiEndpoints';

const getRankList = async (): Promise<GetRankListResponse> => {
  const { data } = await instance.get(API_ENDPOINTS.GET_RANKS);
  return data;
};

export { getRankList };
