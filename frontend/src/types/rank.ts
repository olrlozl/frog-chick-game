export interface rankInfoInterface {
  nickname: string;
  wins: number;
  losses: number;
  rank: number;
}

export interface GetRankListResponse {
  me: rankInfoInterface;
  top10: rankInfoInterface[];
}
