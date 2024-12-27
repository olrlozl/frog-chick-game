import Title from 'components/rank/Title';
import UserRankItem from 'components/rank/UserRankItem';
import 'styles/pages/rank-page.scss';

const RankPage = () => {
  const rankList = {
    me: { nickname: '은지0', wins: 4, losses: 5, rank: 7 },
    users: [
      { nickname: '은지1', wins: 10, losses: 5, isMe: false, rank: 1 },
      { nickname: '은지2', wins: 9, losses: 5, isMe: false, rank: 2 },
      { nickname: '은지3', wins: 8, losses: 5, isMe: false, rank: 3 },
      { nickname: '은지4', wins: 7, losses: 5, isMe: false, rank: 4 },
      { nickname: '은지5', wins: 6, losses: 5, isMe: false, rank: 5 },
      { nickname: '은지6', wins: 5, losses: 5, isMe: false, rank: 6 },
      { nickname: '은지0', wins: 4, losses: 5, isMe: true, rank: 7 },
      { nickname: '은지8', wins: 3, losses: 5, isMe: false, rank: 8 },
      { nickname: '은지9', wins: 2, losses: 5, isMe: false, rank: 9 },
      { nickname: '은지10', wins: 1, losses: 5, isMe: false, rank: 10 },
    ],
  };

  return (
    <div className="rank-page">
      <Title />
      <section className="rank-section">
        <section className='my-rank-section'>
          <UserRankItem
            userInfo={{
              nickname: rankList.me.nickname,
              wins: rankList.me.wins,
              losses: rankList.me.losses,
            }}
            myNickname={rankList.me.nickname}
            rank={rankList.me.rank}
            isMyRankSection={true}
          />
        </section>
        <section className='users-rank-section'>
          {rankList.users.map((user) => (
            <UserRankItem
              userInfo={{
                nickname: user.nickname,
                wins: user.wins,
                losses: user.losses,
              }}
              myNickname={rankList.me.nickname}
              rank={user.rank}
              isMyRankSection={false}
            />
          ))}
        </section>
      </section>
    </div>
  );
};

export default RankPage;
