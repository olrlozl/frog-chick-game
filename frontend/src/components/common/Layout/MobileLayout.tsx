import 'styles/components/common/Layout/mobile-layout.scss';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="layout-wrapper">
      <div className="mobile-frame">{children}</div>
    </div>
  );
};

export default MobileLayout;
