import Header from 'components/common/Layout/Header';
import UserRankItem from 'components/rank/UserRankItem';
import 'styles/pages/rank-page.scss';
import { useRank } from 'hooks/rank/useRank';
import { LocalLoadingSpinner } from 'components/common/LocalLoadingSpinner';

const RankPage = () => {
  const { data, isFetching } = useRank();

  return (
    <div className="rank-page">
      <Header title="순위" />
      <div className="page-content">
        <section className="rank-section">
          {isFetching && <LocalLoadingSpinner />}
          {!isFetching && data && (
            <>
              <section className="my-rank-section">
                <UserRankItem
                  userInfo={{
                    nickname: data.me.nickname,
                    wins: data.me.wins,
                    losses: data.me.losses,
                  }}
                  myNickname={data.me.nickname}
                  rank={data.me.rank}
                  isMyRankSection={true}
                />
              </section>
              <section className="top10-rank-section">
                {data.top10.map((user) => (
                  <UserRankItem
                    key={user.nickname}
                    userInfo={{
                      nickname: user.nickname,
                      wins: user.wins,
                      losses: user.losses,
                    }}
                    myNickname={data.me.nickname}
                    rank={user.rank}
                    isMyRankSection={false}
                  />
                ))}
              </section>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default RankPage;
