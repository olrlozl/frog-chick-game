import React from 'react';
import 'styles/components/common/Modal/overlay.scss';

interface OverLayProps {
  children: React.ReactNode; // children을 ReactNode로 정의
}

const OverLay = ({ children }: OverLayProps) => {
  return <div className="overlay">{children}</div>;
};

export default OverLay;
