import OverLay from 'components/common/Modal/OverLay';
import { useState, useEffect } from 'react';
import 'styles/components/play/count.scss';

interface CountProps {
  onEnd: () => void;
}

const Count = ({ onEnd }: CountProps) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    if (count === -1) {
      onEnd();
      return;
    }

    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [count, onEnd]);

  return (
    <div className="count">
      <OverLay />
      <span className="seconds">{count || '시작'}</span>
    </div>
  );
};

export default Count;
