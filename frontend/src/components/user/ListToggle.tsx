import 'styles/components/user/list-toggle.scss';
import { ReactNode } from 'react';

interface ListToggleProps {
  title: string;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const ListToggle = ({
  title,
  count,
  isOpen,
  onToggle,
  children,
}: ListToggleProps) => {
  return (
    <div className="list-toggle">
      <button
        type="button"
        className="tg-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="tg-left">
          <span className={`tg-chevron ${isOpen ? 'is-open' : ''}`}>{'>'}</span>
          <span className="tg-title">{title}</span>
        </div>

        <span className="tg-count">{count}</span>
      </button>

      {isOpen && <div className="tg-content">{children}</div>}
    </div>
  );
};

export default ListToggle;
