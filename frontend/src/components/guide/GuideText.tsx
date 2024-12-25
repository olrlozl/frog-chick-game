import 'styles/components/guide/guide-text.scss';
import { GuideOptionType } from 'types/guide';

interface GuideTextProps {
  guideOption: GuideOptionType;
}

const GuideText = ({ guideOption }: GuideTextProps) => {
  const guides = {
    rule: [
      '각 선수는 큰 말, 중간 말, 작은 말 각각 2개씩 갖고 시작합니다.',
      '3개의 말을 가로, 세로, 대각선 중 한 줄로 먼저 정렬하면 승리합니다.',
      '작은 말 위에 큰 말을 올릴 수 있습니다. (기억하세요! 큰 말 속에 작은 말이 숨겨져 있다는 것을...)',
    ],
    control: [
      '말판 위의 말 또는 수중의 말을 선택 후 원하는 칸으로 드래그하세요. (빈 칸 또는 더 작은 말 위로 이동할 수 있습니다.)',
      '10초 초과시 턴이 넘어갑니다.',
    ],
  };

  return (
    <ul className="guide-text">
      {guides[guideOption].map((guide) => {
        return <li>{guide}</li>;
      })}
    </ul>
  );
};

export default GuideText;
