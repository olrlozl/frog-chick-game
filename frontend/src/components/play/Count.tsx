import OverLay from 'components/common/Modal/OverLay';
import { START_COUNT } from 'constants/play';
import { useState, useEffect } from 'react';
import 'styles/components/play/count.scss';

interface CountProps {
  onEnd: () => void;
}

const Count = ({ onEnd }: CountProps) => {
  const [count, setCount] = useState<number>(START_COUNT);

  useEffect(() => {
    let currentCount = START_COUNT;
    const timer = setInterval(() => {
      if (currentCount > 0) {
        currentCount -= 1;
        setCount(currentCount);
      } else {
        clearInterval(timer);
        onEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onEnd]);

  return (
    <div className="count">
      <OverLay />
      <span className="seconds">{count || '시작'}</span>
    </div>
  );
};

export default Count;
