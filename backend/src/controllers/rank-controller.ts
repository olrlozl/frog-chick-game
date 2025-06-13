import HttpError from '../models/http-error';
import User from '../models/user';
import { NextFunction, Request, Response } from 'express';

const getRanks = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as string;

  try {
    const user = await User.findById(userId).select(
      'nickname wins losses rank'
    );

    if (!user) {
      return next(
        new HttpError('사용자를 찾을 수 없습니다.', 401, 'INVALID_USERID')
      );
    }

    const me = {
      nickname: user.nickname,
      wins: user.wins,
      losses: user.losses,
      rank: user.rank,
    };

    const topUsers = await User.find({ rank: { $ne: null } }) // rank가 null이 아닌 사용자만
      .sort({ rank: 1 }) // rank 오름차순
      .limit(10)
      .select('nickname wins losses rank')
      .lean();

    const top10 = topUsers.map((user) => ({
      nickname: user.nickname,
      wins: user.wins,
      losses: user.losses,
      rank: user.rank,
    }));

    res.status(200).json({ me, top10 });
  } catch (error) {
    return next(
      new HttpError('순위 조회에 실패했습니다.', 500, 'FAILED_GET_RANK')
    );
  }
};

export { getRanks };
